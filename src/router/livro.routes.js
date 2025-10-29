import express from "express";
import {
  criarLivro,
  listarLivros,
  obterLivros,
  atualizarLivros,
  deletarLivro,
} from "../controllers/livro.controller.js";

const router = express.Router();

// ROTAS CRUD
router.post("/", criarLivro);
router.get("/", listarLivros);
router.get("/:id", obterLivros);
router.put("/:id", atualizarLivros);
router.delete("/:id", deletarLivro);

export default router;