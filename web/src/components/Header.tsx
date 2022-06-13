import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, ButtonGroup, Flex, Heading, Link, Spacer,  } from "@chakra-ui/react"
import { AiOutlineUser } from "react-icons/ai"
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const { data, loading, } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate();

  let body: any = null;

  if (loading) {
    body = null;
  } else if (data && data.me) {
    // user info and logout buttons
    body = (
      <ButtonGroup gap="2">
        <Button aria-label="account" colorScheme="teal" onClick={() => navigate("/me")} leftIcon={<AiOutlineUser />} variant="link">{data.me.email}</Button>
        <Button colorScheme="teal" variant="outline" onClick={async () => await logoutUser()} isLoading={isLoading}>Logout</Button>
      </ButtonGroup>
    )
  } else {
    // register and login buttons
    body = (
      <ButtonGroup gap="2">
        <Button colorScheme="teal" onClick={() => navigate("/register")}>Register</Button>
        <Button colorScheme="teal" variant="outline" onClick={() => navigate("/login")}>Log In</Button>
      </ButtonGroup>
    )
  }

  const logoutUser = async (): Promise<void> => {
    setIsLoading(true)
    await logout();
    localStorage.setItem("token", "")
    try {
      await client.resetStore();
    } catch { }
    navigate("/", { replace: true})
    window.location.reload()
    setIsLoading(false)
  }

  return (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box p="2">
        <Link>
          <Heading size="md" onClick={() => navigate("/")}>JWT Auth Starter</Heading>
        </Link>
      </Box>
      <Spacer />
      {body}
    </Flex>
  )
};
