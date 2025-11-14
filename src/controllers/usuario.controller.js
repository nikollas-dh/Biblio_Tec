import {db} from "../config/db.js";

// ============================
//  Rotas CRUD
// ============================


export async function criarUsuario (req, res){
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha)
      return res.status(400).json({ erro: "Campos obrigatórios" });

    await db.execute(
      `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`,
      [nome, email, senha]
    );

    res.status(201).json({ mensagem: "Usuário criado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


export async function listarUsuarios (req, res){
  try {
    const [rows] = await db.execute("SELECT * FROM usuarios");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


export async function obterUsuario (req, res){
  try {
    const [rows] = await db.execute("SELECT * FROM usuarios WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

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
        perfil: dados_usuario.perfil, // Chave 'perfil' com o valor 'Admin' ou 'Aluno'
        usuario: dados_usuario        // Retorna todos os dados para o front-end
    });

  } catch (err) {
    console.error("Erro no login:", err); 
    res.status(500).json({ erro: "Erro interno do servidor." });
  }
};

export async function atualizarUsuario (req, res){
  try {
    const { nome, email, senha } = req.body;
    await db.execute(
      "UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?",
      [nome, email, senha, req.params.id]
    );
    res.json({ mensagem: "Usuário atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


export async function deletarUsuario (req, res){
  try {
    await db.execute("DELETE FROM usuarios WHERE id = ?", [req.params.id]);
    res.json({ mensagem: "Usuário deletado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

