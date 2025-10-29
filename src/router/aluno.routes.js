import express from "express";
import {
  criarAluno,
  loginAlunos,
  listarAlunos,
  obterAlunos,
  atualizarAlunos,
  deletarAluno,
} from "../controllers/aluno.controller.js";

const router = express.Router();

// ROTAS CRUD
router.post("/", criarAluno);
router.get("/", loginAlunos)
router.get("/", listarAlunos);
router.get("/:id", obterAlunos);
router.put("/:id", atualizarAlunos);
router.delete("/:id", deletarAluno);

export default router;