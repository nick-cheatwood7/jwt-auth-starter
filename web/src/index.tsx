import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import apolloLinks from "./utils/apolloLinks";
import {
  ChakraProvider
} from "@chakra-ui/react"
import { App } from "./App";

const client = new ApolloClient({
  link: apolloLinks,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </ApolloProvider>
  </React.StrictMode>
);
