import React, { useState } from "react";
import {
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Spacer,
  Text
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, MeQuery, MeDocument } from "../generated/graphql";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

interface LoginFormProps {}

export const LoginForm: React.FC<LoginFormProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    console.log("form submitted");
    const response = await login({
      variables: {
        email,
        password,
      },
      // update Apollo Cache
      update: (store, { data }) => {
        if (!data) {
          return null;
        }
        store.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            me: data.login.user,
          },
        });
      },
    });

    if (response && response.data) {
      const token = response.data.login.accessToken;
      localStorage.setItem("token", token);
    }

    navigate("/", { replace: true });
  };

  return (
    <Flex direction="column" background="gray.100" p={12} rounded={6}>
      <form onSubmit={async (e) => handleLogin(e)}>
        <Heading mb={6}>Log In</Heading>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={AiOutlineMail} color="gray.400" />}
          />
          <Input
            placeholder="john.appleseed@mail.com"
            value={email}
            variant="outline"
            mb={3}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={RiLockPasswordLine} color="gray.400" />}
          />
          <Input
            placeholder="******"
            value={password}
            variant="outline"
            mb={6}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
        <Button colorScheme="teal" type="submit" width="100%" mb={3}>
          Log In
        </Button>
      </form>
      <Flex direction="row">
        <Text color="gray.600">Don't have an account?</Text>
        <Spacer />
        <Link onClick={() => navigate("/register")}>
          Register
        </Link>
      </Flex>
    </Flex>
  );
};
