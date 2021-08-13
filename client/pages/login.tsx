import { gql, useMutation } from '@apollo/client';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Heading,
  HStack,
  VStack,
  Link as ChakraLink,
  Text,
  Checkbox,
  FormErrorMessage,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;


export default function loginPage(): ReactElement {
  const [login, { error }] = useMutation(LOGIN);
  const router = useRouter();
  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res= await login({ variables: data });
      if(res.data.login){
        router.push("/")
      }
      
    } catch (err) {
     throw new Error(err);
    }
  };

  return (
    <div>
      <HStack height="100vh">
        <Flex height="100%" width="40%" flex="3 3 auto" backgroundColor="blue.400"></Flex>
        <Flex height="100%" flex="5 5 auto" width="60%">
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack margin="40" alignItems="flex-start" flexGrow={1}>
              <Heading size="xl" mb="10">
                Login
              </Heading>

              <VStack gridGap="5" width="80%">
                <Flex width="100%">
                  <FormControl id="email" isInvalid={Boolean(error)}>
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" size="lg" name="email" {...register('email')} />
                    <FormErrorMessage>{error && error.message}</FormErrorMessage>
                  </FormControl>
                </Flex>
                <Flex width="100%">
                  <FormControl id="email">
                    <FormLabel>Password</FormLabel>
                    <Input type="password" size="lg" name="password" {...register('password')} />
                  </FormControl>
                </Flex>
              </VStack>
              <Checkbox>Remember me</Checkbox>
              <Button colorScheme="blue" type="submit">
                Login
              </Button>
              <Text size="sm">
                Don't have an account?
                <Link href="/signup">
                  <ChakraLink color="blue.300">Signup</ChakraLink>
                </Link>
              </Text>
            </VStack>
          </form>
        </Flex>
      </HStack>
    </div>
  );
}
