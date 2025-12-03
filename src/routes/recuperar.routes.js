import express from "express";
import { buscarEmail } from "../controllers/recuperar.controller.js";

const router = express.Router();

// Rota para solicitar o envio do código
router.post("/solicitar", buscarEmail);

// Rota para redefinir a senha usando o código
// router.post("/redefinir", redefinirSenha);

export default router;