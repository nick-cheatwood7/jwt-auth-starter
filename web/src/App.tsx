import React from "react";
import Routes from "./Routes";
import { Flex } from "@chakra-ui/react"


interface Props {}

export const App: React.FC<Props> = () => {
  return (
  <Flex height="100vh" alignItems="center" justifyContent="center">
      <Routes />
  </Flex>
  );
};
