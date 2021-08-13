import { ApolloClient, InMemoryCache } from "@apollo/client";
import {createUploadLink} from "apollo-upload-client";

const client = new ApolloClient({ 
    link: createUploadLink({
        uri: "http://localhost:3000/server/graphql",
    }),
    cache: new InMemoryCache({
        addTypename: false
    }),
});


export default client;