import express from "express";
import { listarUsuarios, 
        criarUsuario, 
        obterUsuario, 
        atualizarUsuario, 
        deletarUsuario 
    }from "../controllers/usuario.controller.js";


const router = express.Router();

// /usuario / //
router.get("/", listarUsuarios);
router.post("/", criarUsuario);
router.get("/:id", obterUsuario);
router.put("/:id", atualizarUsuario);
router.delete("/:id", deletarUsuario);



export default router;