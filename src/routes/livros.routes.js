import express from "express";
import { listarLivros, 
        criarLivros, 
        buscarLivro, 
        atualizarLivro, 
        deletarLivro 
    }from "../controllers/livros.controller.js";


const router = express.Router();

// /livros / //
router.get("/", listarLivros);
router.post("/", criarLivros);
router.get("/:id", buscarLivro);
router.put("/:id", atualizarLivro);
router.delete("/:id", deletarLivro);



export default router;