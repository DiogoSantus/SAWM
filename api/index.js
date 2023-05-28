import express from "express"
import userRoutes from "./routes/users.js"
import walletRoutes from "./routes/wallets.js"
import cors from "cors"

const mysql = require("mysql");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const salt = 10;

//const express = require('express')
const app = express()
const port = 8800

app.use(express.json())
app.use(cors({
    origin:["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(cookieParser());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"signup"
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Error: "You are not authenticated"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json({Error: "Token is not ok"});
            } else {
                req.name = decoded.name;
                next();
            }
        })
    }
}


app.get('/',verifyUser ,(req, res) => {
    return res.json({Status: "Success", name: req.name});
})

app.post('/register', (req, res) => {
    const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({Error: "Error for hashing password"});
        const values =[
            req.body.name,
            req.body.email,
            hash
        ]
        db.query(sql, [values], (err, result) => {
            if (err) return res.json({Error: "Inserting data Error in server"})
            return res.json({Status: "Success"});
        })
    })
    
})

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM login WHERE email = ?';
    db.query(sql, [req.body.email], (err, data) => {
      if (err ) return res.json({Error: "Login error in server" });
      if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
            if (err) return res.json({Error: "Password compare error" });
            if (response) {
                const name = data[0].name;
                const token = jwt.sign({name}, "jwt-secret-key", {expiresIn:'1d'});
                res.cookie('token', token);
                return res.json({Status: "Success" });
            } else {
                return res.json({Error: "Password not matched" });
            }
        });
      } else {
        return res.json({Error: "No email existed" });
      }
    });
  });

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
})

app.use("/", userRoutes)
app.use("/", walletRoutes)

app.listen(port , ()=>{
    console.log('Servidor iniciado com Sucesso')
})