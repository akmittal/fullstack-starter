import 'reflect-metadata';
import 'es6-shim';

import { createServer } from 'http';

import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { graphqlUploadExpress } from 'graphql-upload';
import express from 'express';

import { customAuthChecker, getUser } from './util/index';
import { RoleResolver } from './resolver/RoleResolver';
import { UserResolver } from './resolver/UserResolver';
import { EmailResolver } from './entity/VerifyEmail';
import { Context } from './resolver/types/context';

dotenv.config();

async function main(): Promise<string> {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [EmailResolver, RoleResolver, UserResolver],
    authChecker: customAuthChecker,
  });
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => {
      const cauth = req.cookies.cauth;
      const response: Context = { res };

      try {
        const user = getUser(cauth);
        response.user = user;
      } catch (error) {
        response.error = error;
      }
      return response;
    },
  });
  await server.start();

  const app = express();
  const httpServer = createServer(app);
  const subscriptionServer = SubscriptionServer.create(
    {
      // This is the `schema` we just created.
      schema,
      // These are imported from `graphql`.
      execute,
      subscribe,
    },
    {
      // This is the `httpServer` we created in a previous step.
      server: httpServer,
      // This `server` is the instance returned from `new ApolloServer`.
      path: server.graphqlPath,
    },
  );

  // Shut down in the case of interrupt and termination signals
  // We expect to handle this more cleanly in the future. See (#5074)[https://github.com/apollographql/apollo-server/issues/5074] for reference.
  ['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, () => subscriptionServer.close());
  });
  app.use(graphqlUploadExpress({ maxFileSize: 1000000 }));
  app.use(cookieParser());
  app.use('/static/uploads', express.static('uploads/'));

  server.applyMiddleware({ app, path: '/graphql' });

  return new Promise((resolve) =>
    httpServer.listen({ port: 4000 }, () => resolve('🚀 Server has started on http://localhost:4000')),
  );
}

main()
  .then((res: string) => {
    console.info(res);
  })
  .catch((err) => {
    throw err;
  });
