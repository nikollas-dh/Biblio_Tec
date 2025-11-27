import { db } from "./db.js";

// Buscar turmas pelo ID do curso
export async function getTurmas(req, res) {
    const { curso_id } = req.params;

    try {
        const [rows] = await db.query(
            "SELECT * FROM tabela_turma WHERE curso_id = ? ORDER BY turma",
            [curso_id]
        );

        res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao buscar turmas:", error);
        res.status(500).json({ error: "Erro ao buscar turmas" });
    }
}