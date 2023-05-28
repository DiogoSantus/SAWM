import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const GridWallet = ({ wallets, setWallets, setOnEditWallet }) => {
  const handleEdit = (item) => {
    setOnEditWallet(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/wallets/" + id)
      .then(({ data }) => {
        const newArray = wallets.filter((wallet) => wallet.id !== id);

        setWallets(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEditWallet(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>User ID</Th>
          <Th>Currency</Th>
          <Th onlyWeb>Balance</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {wallets.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.user_id}</Td>
            <Td width="30%">{item.currency}</Td>
            <Td width="20%" onlyWeb>
              {item.balance}
            </Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default GridWallet;