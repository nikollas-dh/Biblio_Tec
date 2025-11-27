import { db } from "./db.js";

// Buscar todos os cursos
export async function getCursos(req, res) {
    try {
        const [rows] = await db.query("SELECT * FROM tabela_curso ORDER BY nome");
        res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao buscar cursos:", error);
        res.status(500).json({ error: "Erro ao buscar cursos" });
    }
}
