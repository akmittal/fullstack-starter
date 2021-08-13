import { ReactElement } from 'react';
import { HStack, Spinner } from '@chakra-ui/react';
import Head from 'next/head';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';

import client from '../util/apollo-client';

const GET_RESORT_MENU = gql`
  query restaurant($id: String!) {
    restaurant(id: $id) {
      name
      imageURL
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

  return <div>{JSON.stringify(data)}</div>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res: GetServerSidePropsResult<Props> = { props: {} };
  const { data, errors } = await client.query({
    query: GET_RESORT_MENU,
    variables: { id: ctx.params.id },
    errorPolicy: 'all',
    context: {
      headers: ctx.req.headers,
    },
  });
  console.log({data, errors})
  if (errors) {
    res.props.errors = errors;
  }
  res.props.data = data;
  return res;
};
