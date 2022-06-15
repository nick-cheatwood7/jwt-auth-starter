import { Container, Flex, VStack } from '@chakra-ui/react';
import React from 'react'
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = () => {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" flexDirection="column">
      <VStack width="100%" height="100%">
        {/* Navbar */}
        <Header />
        <Container maxW="container.lg" centerContent height="100%" justifyContent="center">
          {/* App content */}
            <Outlet />
        </Container>
      </VStack>
    </Flex>
  );
}