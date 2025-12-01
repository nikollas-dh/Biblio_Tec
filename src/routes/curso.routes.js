import express from "express";
import { getCursos } from "../controllers/cursoController.js";

const router = express.Router();

// Rota para buscar todos os cursos
router.get("/", getCursos);

export default router;