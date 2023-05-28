import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const FormWallet = ({ getWallets, onEditWallet, setOnEditWallet }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEditWallet) {
      const wallet = ref.current;

      wallet.user_id.value = onEditWallet.user_id;
      wallet.currency.value = onEditWallet.currency;
      wallet.balance.value = onEditWallet.balance;
    }
  }, [onEditWallet]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const wallet = ref.current;

    if (
      !wallet.user_id.value ||
      !wallet.currency.value ||
      !wallet.balance.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEditWallet) {
      await axios
        .put("http://localhost:8800/wallets/" + onEditWallet.id, {
          user_id: wallet.user_id.value,
          currency: wallet.currency.value,
          balance: wallet.balance.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/wallets", {
            user_id: wallet.user_id.value,
            currency: wallet.currency.value,
            balance: wallet.balance.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    wallet.user_id.value = "";
    wallet.currency.value = "";
    wallet.balance.value = "";

    setOnEditWallet(null);
    getWallets();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>User ID</Label>
        <Input name="user_id" />
      </InputArea>
      <InputArea>
        <Label>Currency</Label>
        <Input name="currency" />
      </InputArea>
      <InputArea>
        <Label>Balance</Label>
        <Input name="balance" />
      </InputArea>

      <Button type="submit">GUARDAR</Button>
    </FormContainer>
  );
};

export default FormWallet;