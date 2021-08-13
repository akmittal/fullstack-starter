import { ReactElement } from 'react';
import { Heading, Input, Box, VStack, Text } from '@chakra-ui/react';
import { gql } from '@apollo/client';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';

import client from '../../util/apollo-client';

const GET_HOME_DATA = gql`
  query home {
    me {
      firstName
      lastName
    }
  }
`;

interface Props {
  errors?: any;
  data?: any;
}

export default function HomeContainer({ data, errors }: Props): ReactElement {
  if (errors) {
    return <>{JSON.stringify(errors)}</>;
  }

  return <VStack>
<Heading>Profile</Heading>
<Text>{data.me.firstName}</Text>
<Text>{data.me.lastName}</Text>
<Text>{data.me.email}</Text>

  </VStack>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res: GetServerSidePropsResult<Props> = { props: {} };
  const { data, errors } = await client.query({
    query: GET_HOME_DATA,

    errorPolicy: 'ignore',
    context: {
      headers: ctx.req.headers,
    },
  });
  if (errors) {
    res.props.errors = errors;
  }
  res.props.data = data;
  return res;
};
