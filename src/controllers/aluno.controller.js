import { db } from "../config/db.js"
// ============================
//  Rotas CRUD
// ============================


export async function criarAluno(req, res) {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha)
      return res.status(400).json({ erro: "Por favor preencha os campos obrigatórios" });

    console.log("📦 Dados recebidos:", { nome, email, senha });

    await db.execute(
      "INSERT INTO alunos (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, senha],

      //adiciona na tabela Login tambem
      await db.execute(
        "INSERT INTO login (email, senha) VALUES (?, ?)",
        [email, senha]
      )
    );

    res.status(201).json({ mensagem: "Usuário criado com sucesso!" });
  } catch (err) {
    console.error("❌ ERRO AO CRIAR ALUNO:", err);
    res.status(500).json({ erro: err.message });
  }
}

export async function loginAlunos(req, res) {
   try {
    const [rows] = await db.execute("SELECT * FROM login");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function listarAlunos(req, res) {
  try {
    const [rows] = await db.execute("SELECT * FROM alunos");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


export async function obterAlunos(req, res) {
  try {
    const [rows] = await db.execute("SELECT * FROM alunos WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export async function atualizarAlunos(req, res) {
  try {
    const { nome, email, senha } = req.body;
    await db.execute(
      "UPDATE alunos SET nome = ?, email = ?, senha = ? WHERE id = ?",
      [nome, email, senha, req.params.id]
    );
    res.json({ mensagem: "Usuário atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


export async function deletarAluno(req, res) {
  try {
    await db.execute("DELETE FROM alunos WHERE id = ?", [req.params.id]);
    res.json({ mensagem: "Usuário deletado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};