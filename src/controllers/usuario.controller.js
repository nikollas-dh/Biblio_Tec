import { db } from "../config/db.js";


export async function criarUsuario(req, res) {
  try {
    const { nome, email, senha, curso_id, turma_id, perfil } = req.body;

    if (!nome || !email || !senha)
      return res.status(400).json({ erro: "Campos obrigatórios" });

    await db.execute(
      `INSERT INTO usuarios 
        (nome, email, senha, curso_id, turma_id, perfil) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nome, email, senha, curso_id || null, turma_id || null, perfil || "Aluno"]
    );

    res.status(201).json({ mensagem: "Usuário criado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}


export async function listarUsuarios(req, res) {
  try {
    const [rows] = await db.execute(`
      SELECT u.id, u.nome, u.email, u.perfil,
             c.nome AS curso
      FROM usuarios u
      LEFT JOIN tabela_curso c ON c.id = u.curso
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}


export async function obterUsuario(req, res) {
  try {
    const [rows] = await db.execute(
      `
      SELECT u.id, u.nome, u.email, u.perfil,
             u.curso_id, u.turma_id,
             c.nome AS curso,
             t.turma AS turma
      FROM usuarios u
      LEFT JOIN tabela_curso c ON c.id = u.curso_id
      LEFT JOIN tabela_turma t ON t.id = u.turma_id
      WHERE u.id = ?
    `,
      [req.params.id]
    );

    if (rows.length === 0)
      return res.status(404).json({ erro: "Usuário não encontrado" });

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function login (req, res){
  try {
    const { email, senha } = req.body; 
    const [usuario] = await db.execute(
     `SELECT 
        nome, 
        email, 
        perfil 
      FROM usuarios WHERE email = ? AND senha = ?`, 

      [
        email, 
        senha
      ]
    );

    if (usuario.length === 0) {
      return res.status(401).json({ erro: "Email ou senha inválidos." }); 
    }

    const dados_usuario = usuario[0]
    return res.status(200).json({ 
        mensagem: "Login efetuado.",
        perfil: dados_usuario.perfil, 
        usuario: dados_usuario        
    });

  } catch (err) {
    console.error("Erro no login:", err); 
    res.status(500).json({ erro: "Erro interno do servidor." });
  }
};



export async function atualizarUsuario(req, res) {
  try {
    const { nome, email, senha, curso_id, turma_id, perfil } = req.body;

    await db.execute(
      `
      UPDATE usuarios 
      SET nome = ?, email = ?, senha = ?, 
          curso_id = ?, turma_id = ?, perfil = ?
      WHERE id = ?
    `,
      [
        nome,
        email,
        senha,
        curso_id || null,
        turma_id || null,
        perfil || "Aluno",
        req.params.id,
      ]
    );

    res.json({ mensagem: "Usuário atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}


export async function deletarUsuario(req, res) {
  try {
    await db.execute("DELETE FROM usuarios WHERE id = ?", [req.params.id]);
    res.json({ mensagem: "Usuário deletado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}