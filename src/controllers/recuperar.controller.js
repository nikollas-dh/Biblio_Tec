import {db} from "../config/db.js";

export async function buscarEmail (req, res){
  try {
    const { email } = req.body; 
    const [usuario] = await db.execute(
     `SELECT  
        email 
      FROM usuarios WHERE email = ? `, 

      [
        email
      ]
    );

    if (usuario.length === 0) {
      return res.status(401).json({ erro: "Email inválido." }); 
    }

    const email_usuario = usuario[0]
    return res.status(200).json({ 
        mensagem: "Email encontrado.",
        perfil: email_usuario.perfil, 
        usuario: email_usuario        
    });

  } catch (err) {
    console.error("Erro ao buscar email.", err); 
    res.status(500).json({ erro: "Erro interno do servidor." });
  }
};