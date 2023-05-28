import { db } from "../db.js";

export const getWallets = (_, res) => {
  const q = "SELECT * FROM wallets";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addWallet = (req, res) => {
  const q =
    "INSERT INTO wallets(`user_id`, `currency`, `balance`) VALUES(?)";

  const values = [
    req.body.user_id,
    req.body.currency,
    req.body.balance,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Wallet criado com sucesso.");
  });
};

export const updateWallet = (req, res) => {
  const q =
    "UPDATE wallets SET `user_id` = ?, `currency` = ?, `balance` = ? WHERE `id` = ?";

  const values = [
    req.body.user_id,
    req.body.currency,
    req.body.balance,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Wallet atualizado com sucesso.");
  });
};

export const deleteWallet = (req, res) => {
  const q = "DELETE FROM wallets WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Wallet eliminado com sucesso.");
  });
};
