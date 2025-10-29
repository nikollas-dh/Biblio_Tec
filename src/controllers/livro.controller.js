import { db } from "../config/db.js"
// ============================
//  Rotas CRUD
// ============================


export async function criarLivro(req, res) {
  try {
    const { titulo, autor, disponivel } = req.body;
    if (!titulo || !autor || !disponivel)
      return res.status(400).json({ erro: "Campos obrigatórios" });

    console.log("📦 Dados recebidos:", { titulo, autor, disponivel });

    await db.execute(
      "INSERT INTO livros (titulo, autor, disponivel) VALUES (?, ?, ?)",
      [titulo, autor, disponivel],

    );

    res.status(201).json({ mensagem: "Livro criado com sucesso!" });
  } catch (err) {
    console.error("❌ ERRO AO CRIAR LIVRO:", err);
    res.status(500).json({ erro: err.message });
  }
}

export async function listarLivros(req, res) {
  try {
    const [rows] = await db.execute("SELECT * FROM livros");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


export async function obterLivros(req, res) {
  try {
    const [rows] = await db.execute("SELECT * FROM livros WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ erro: "Livro não encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export async function atualizarLivros(req, res) {
  try {
    const { nome, email, senha } = req.body;
    await db.execute(
      "UPDATE livros SET titulo = ?, autor = ?, disponivel = ? WHERE id = ?",
      [titulo, autor, disponivel, req.params.id]
    );
    res.json({ mensagem: "Livro atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


export async function deletarLivro(req, res) {
  try {
    await db.execute("DELETE FROM livros WHERE id = ?", [req.params.id]);
    res.json({ mensagem: "Livro deletado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};