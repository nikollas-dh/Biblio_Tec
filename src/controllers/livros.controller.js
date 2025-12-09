import {db} from "../config/db.js";


export async function criarLivros (req, res){
  try {
    const { titulo, autor, genero, editora, ano_publicacao, isbn, idioma, formato, caminho_capa, sinopse } = req.body;
    if (!titulo || !autor || !genero || !caminho_capa)
      return res.status(400).json({ erro: "Campos obrigatórios" });

    await db.execute(
      "INSERT INTO livros (titulo, autor, genero, editora, ano_publicacao, isbn, idioma, formato,caminho_capa, sinopse) VALUES (?, ?,?,?,?,?,?,?,?,?)",
      [titulo, autor, genero, editora || null, ano_publicacao || null, isbn || null, idioma || null, formato || null,caminho_capa, sinopse || null]
    );

    res.status(201).json({ mensagem: "Livro criado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


export async function listarLivros(req, res) {
  console.log(req.query)

  const titulo = req.query.titulo
   const genero = req.query.genero

  if (!titulo || !genero) {
    try {
      const [livros] = await db.execute("SELECT * FROM livros");
      res.json(livros);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  } else {
    try {
      const [livros] = await db.execute(`SELECT * FROM livros WHERE TITULO LIKE "%${titulo}%" OR genero LIKE  "%${genero}%"`);
      res.json(livros);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }


};


export async function buscarLivro (req, res){
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


export async function atualizarLivro (req, res){
  try {
    const { titulo, autor, genero, editora, ano_publicacao, isbn , idioma, formato, caminho_capa, sinopse } = req.body;
    await db.execute(
      "UPDATE livros SET titulo = ?, autor = ? WHERE id = ?",
      [titulo, autor, genero, editora, ano_publicacao, isbn , idioma, formato, caminho_capa, sinopse, req.params.id]
    );
    res.json({ mensagem: "Livro atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


export async function deletarLivro (req, res){
  try {
    await db.execute("DELETE FROM Livros WHERE id = ?", [req.params.id]);
    res.json({ mensagem: "Livro deletado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
