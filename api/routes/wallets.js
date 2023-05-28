import express from "express";
import { addWallet, deleteWallet, getWallets, updateWallet } from "../controllers/wallet.js";

const router = express.Router()

router.get("/wallets", getWallets)

router.post("/wallets", addWallet)

router.put("/wallets/:id", updateWallet)

router.delete("/wallets/:id", deleteWallet)

export default router