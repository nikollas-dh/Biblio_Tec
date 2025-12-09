import express from "express";
import { solicitarRecuperacao, redefinirSenha } from "../controllers/recuperar.controller.js";

const router = express.Router();

// Base URL: /api/recuperar

// Rota para solicitar o envio do código (Recebe o EMAIL)
// Endpoint: POST /api/recuperar/solicitar
router.post("/solicitar", solicitarRecuperacao);

// Rota para redefinir a senha (Recebe EMAIL, CÓDIGO e NOVA SENHA)
// Endpoint: POST /api/recuperar/redefinir
router.post("/redefinir", redefinirSenha);

export default router;