import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { useUsersQuery } from "../generated/graphql";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const { data } = useUsersQuery({ fetchPolicy: "network-only" });

  if (!data) {
    return <div>loading...</div>;
  }

  return (
    // <div>
    //   <div>users:</div>
    //   <ul>
    //     {data.users.map((u) => {
    //       return (
    //         <li key={u.id}>
    //           {u.email}, {u.id}, {u.lastLogin}
    //         </li>
    //       );
    //     })}
    //   </ul>
    // </div>
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>User ID</Th>
            <Th>Email</Th>
            <Th>Last Login</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.users.map((u) => {
            const formattedDate = new Date(u.lastLogin as number);
            return (
              <Tr>
                <Td>{u.id}</Td>
                <Td>{u.email}</Td>
                <Td>{u.lastLogin && formattedDate.toLocaleString()}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
