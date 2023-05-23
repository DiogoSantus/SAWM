import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM utilizadores";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO utilizadores('nome', 'email', 'telefone', 'data_nascimento') VALUES(?)";

  const values = [
    req.body.nome,
    req.body,email,
    req.body.telefone,
    req.body.data_nascimento,
];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Utilizador criado com sucesso.");
  })
}