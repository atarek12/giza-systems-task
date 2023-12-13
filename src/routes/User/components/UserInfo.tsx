import React from "react";
import { TUser } from "../../../shared/types";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

interface UserInfoProps {
  user: TUser;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Property</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(user).map((key) => (
            <Tr key={key}>
              <Td>{key}</Td>
              <Td>
                {typeof (user as any)[key] === "string"
                  ? (user as any)[key]
                  : JSON.stringify((user as any)[key], null, 2)}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default UserInfo;
