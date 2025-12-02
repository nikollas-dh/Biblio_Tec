import express from "express";
import { listarCursos, obterCursos } from "../controllers/cursoController.js";

const router = express.Router();

// GET /api/curso
router.get("/", listarCursos);

// GET /api/curso/:id
router.get("/:id", obterCursos);

export default router;