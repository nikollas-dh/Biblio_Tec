import { db } from "../config/db.js";

// 1. Função para LISTAR todas as turmas de um curso (espera curso_id)
export const listarTurmas = async (req, res) => {
    // O nome 'curso_id' deve corresponder ao parâmetro definido na rota
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
};

// 2. Função para OBTER uma única turma por ID (espera id da turma)
export const obterTurma = async (req, res) => {
    const { id } = req.params; 

    try {
        const [rows] = await db.query(
            `
            SELECT 
                t.id, t.turma, t.curso_id, c.nome AS nome_curso
            FROM tabela_turma t
            INNER JOIN tabela_curso c ON c.id = t.curso_id
            WHERE t.id = ?
            `,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Turma não encontrada" });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Erro ao buscar turma:", error);
        res.status(500).json({ error: "Erro ao buscar turma" });
    }
};