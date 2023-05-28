import express from "express"
import userRoutes from "./routes/users.js"
import walletRoutes from "./routes/wallets.js"
import cors from "cors"

//const express = require('express')
const app = express()
const port = 8800

app.use(express.json())
app.use(cors())

app.use("/", userRoutes)
app.use("/", walletRoutes)

app.listen(port , ()=>{
    console.log('Servidor iniciado com Sucesso')
})