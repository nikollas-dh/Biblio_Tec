import { db } from "../config/db.js";

export const listarCursos = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT id, nome
            FROM tabela_curso
            ORDER BY nome;
        `);

        res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao buscar cursos:", error);
        res.status(500).json({ error: "Erro ao buscar cursos" });
    }
};

export const obterCursos = async (req, res) => {
    const { id } = req.params; 

    try {
        const [rows] = await db.query(
            `
            SELECT id, nome
            FROM tabela_curso
            WHERE id = ?
            `,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Curso não encontrado" });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Erro ao buscar curso:", error);
        res.status(500).json({ error: "Erro ao buscar curso" });
    }
};