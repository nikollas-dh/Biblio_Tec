import express from "express";
import { listarCursos, obterCursos } from "../controllers/cursoController.js";

const router = express.Router();
router.get("/", listarCursos);
router.get("/:id", obterCursos);

export default router;