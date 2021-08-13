import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Flex,
  Heading,
  HStack,
  VStack,
  Link as ChakraLink,
  Text,
  Checkbox,
  Box,
  FormErrorMessage,
  Spinner,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';

import client from '../util/apollo-client';

const CREATE_USER = gql`
  mutation signUp($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signUp(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      id
      firstName
      lastName
      email
    }
  }
`;

interface Props {}

export default function signup(props: Props): ReactElement {
  const [createUser, { error, loading }] = useMutation(CREATE_USER);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    const variables = data;
    try {
      await createUser({ variables });
      router.push('/login');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <HStack height="100vh">
        <Flex height="100%" width="40%" flex="3 3 auto" backgroundColor="blue.100" alignItems="flex-start">
          <Box margin="20">
            <Image src="/logo_transparent.png" width="400px" height="200px" />
          </Box>
        </Flex>
        <Flex height="100%" flex="5 5 auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack margin="20" alignItems="flex-start">
              {error && <div>{error.message}</div>}
              <Heading size="xl" mb="10">
                Register
              </Heading>
              <Heading size="sm">Register User</Heading>

              <Flex flexWrap="wrap" gridGap="5" alignItems="start">
                <Flex width="calc(50% - 20px)">
                  <FormControl id="fName" isInvalid={errors.firstName} isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      name="firstName"
                      autoComplete="given-name"
                      {...register('firstName', { required: true })}
                    />
                    <FormErrorMessage>{errors.firstName && 'FirstName is required'}</FormErrorMessage>
                  </FormControl>
                </Flex>
                <Flex width="calc(50% - 20px)">
                  <FormControl id="lName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      name="lastName"
                      autoComplete="family-name"
                      {...register('lastName', { required: true })}
                    />
                  </FormControl>
                </Flex>
                <Flex width="calc(50% - 20px)">
                  <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>

                    <Input type="email" name="email" {...register('email', { required: true })} />
                    <FormHelperText>We'll never share your email.</FormHelperText>
                  </FormControl>
                </Flex>
                <Flex width="calc(50% - 20px)"></Flex>
                <Flex width="calc(50% - 20px)">
                  <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      name="password"
                      {...register('password', { required: true, minLength: 8 })}
                    />
                  </FormControl>
                </Flex>
                <Flex width="calc(50% - 20px)">
                  <FormControl id="confirm-password" isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input type="password" {...register('confirmPassword', { required: true })} />
                  </FormControl>
                </Flex>
              </Flex>
              <FormControl id="agreeTerms" isRequired>
                <Checkbox {...register('agreeTerms', { required: true })} name="agreeTerms">
                  I agree to all the <ChakraLink>Term</ChakraLink>, <ChakraLink>Privacy Policy</ChakraLink>
                </Checkbox>
                <FormErrorMessage>{'Agree to terms and conditions'}</FormErrorMessage>
              </FormControl>

              <Button type="submit" colorScheme="blue">
                Create Account
              </Button>
              <Text size="sm">
                Already have an account?
                <Link href="/login">
                  <ChakraLink color="blue.300">Log In</ChakraLink>
                </Link>
              </Text>
            </VStack>
          </form>
        </Flex>
      </HStack>
    </div>
  );
}
