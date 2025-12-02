import express from "express";
import { listarTurmas, obterTurma } from "../controllers/turmaController.js";

const router = express.Router();

// GET /api/turma/:curso_id (Usado pelo frontend para listar turmas de um curso)
// O nome do parâmetro 'curso_id' corresponde ao que o controller espera.
router.get("/:curso_id", listarTurmas);

// GET /api/turma/detalhe/:id (Para obter uma turma específica, evita conflito com a rota de cima)
router.get("/detalhe/:id", obterTurma);

export default router;