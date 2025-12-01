import { db } from "./db.js";

// Buscar turmas pelo ID do curso
export async function getTurmas(req, res) {
    const { curso_id } = req.params;

    try {
        const [rows] = await db.query(
            `
            SELECT 
                t.id,
                t.turma,
                t.curso_id,
                c.nome AS nome_curso
            FROM tabela_turma t
            INNER JOIN tabela_curso c ON c.id = t.curso_id
            WHERE t.curso_id = ?
            ORDER BY t.turma
            `,
            [curso_id]
        );

        res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao buscar turmas:", error);
        res.status(500).json({ error: "Erro ao buscar turmas" });
    }
}