import express from "express";
import { listarAvaliacoes,
        criarAvaliacao
    }from "../controllers/avaliacoes.controller.js";

    
const router = express.Router();

// /avaliacoes / //
router.get("/", listarAvaliacoes);
router.post("/", criarAvaliacao);


export default router;