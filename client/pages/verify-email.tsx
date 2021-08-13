import { Flex, Heading } from '@chakra-ui/react';
import {gql} from '@apollo/client';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import  { ReactElement, useEffect } from 'react';

import client from '../util/apollo-client';

const VERIFY_EMAIL = gql`
  mutation verifyEmail($token: String!) {
    verifyEmail(token: $token)
  }
`;
interface Props {
  res: any;
}

export default function veriftyEmail({ res }: Props): ReactElement {
  const router = useRouter();
  useEffect(() => {
    if(res.verifyEmail)
    router.push(`/login`);
  }, [res.verifyEmail])
  
  return (
    <Flex justifyContent="center">
      <>{res.verifyEmail && 'Email verified'}</>
      <>{!res.verifyEmail && <Heading size="lg">Email verification failed</Heading>}</>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query;
  const res = await client.mutate({
    mutation: VERIFY_EMAIL,
    variables: {
      token: query.token,
    },
  });

  return { props: { res: res.data } };
};
