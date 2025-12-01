import express from "express";
import { getTurmas } from "../controllers/turmaController.js";

const router = express.Router();

// Rota correta para buscar todas as turmas de um curso
router.get("/curso/:curso_id", getTurmas);

export default router;