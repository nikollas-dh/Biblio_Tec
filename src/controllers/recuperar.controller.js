import {db} from "../config/db.js";

export const solicitarRecuperacao = async (req, res) => {
    const { email } = req.body; 

    if (!email) {
        return res.status(400).json({ error: "O campo email é obrigatório." });
    }

    try {
        const [rows] = await db.query(
            "SELECT id FROM usuarios WHERE email = ?", 
            [email]
        );
        const usuarioExistente = rows.length > 0;

        if (!usuarioExistente) {
             console.log(`Tentativa de recuperação para email não encontrado: ${email}`);
        }
        
        return res.status(200).json({ 
            message: "E-mail processado com sucesso. Prossiga para a redefinição de senha." 
        });

    } catch (error) {
        console.error("Erro no BD ao solicitar recuperação:", error);
        return res.status(500).json({ error: "Erro interno do servidor ao processar a solicitação." });
    }
};

export const redefinirSenha = async (req, res) => {
    const { email, novaSenha, confirmaSenha } = req.body; 
    
    if (!email || !novaSenha || !confirmaSenha) {
        return res.status(400).json({ error: "Todos os campos (email e senhas) são obrigatórios." });
    }
    if (novaSenha !== confirmaSenha) {
        return res.status(400).json({ error: "As novas senhas não coincidem." });
    }

    try {
        const senhaEmTextoPuro = novaSenha;

        const [resultado] = await db.query(
            "UPDATE usuarios SET senha = ? WHERE email = ?", 
            [senhaEmTextoPuro, email] 
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        return res.status(200).json({ message: "Senha redefinida com sucesso!" });
        
    } catch (error) {
        console.error("Erro no BD ao redefinir senha:", error);
        return res.status(500).json({ error: "Erro interno ao tentar redefinir a senha." });
    }
};







// import { db } from "../config/db.js";
// import bcrypt from 'bcrypt'; 

// const saltRounds = 10; 

// export const solicitarRecuperacao = async (req, res) => {
//     const { email } = req.body; 

//     if (!email) {
//         return res.status(400).json({ error: "O campo email é obrigatório." });
//     }

//     try {
//         const [rows] = await db.query(
//             "SELECT id FROM usuarios WHERE email = ?", 
//             [email]
//         );
//         const usuarioExistente = rows.length > 0;
//         if (!usuarioExistente) {
//              console.log(`Tentativa de recuperação para email não encontrado: ${email}`);
//         }
//         return res.status(200).json({ 
//             message: "E-mail processado com sucesso. Prossiga para a redefinição de senha." 
//         });

//     } catch (error) {
//         console.error("Erro no BD ao solicitar recuperação:", error);
//         return res.status(500).json({ error: "Erro interno do servidor ao processar a solicitação." });
//     }
// };

// redefinirSenha = async (req, res) => {
//     const { email, novaSenha, confirmaSenha } = req.body; 
    
//     if (!email || !novaSenha || !confirmaSenha) {
//         return res.status(400).json({ error: "Todos os campos (email e senhas) são obrigatórios." });
//     }
//     if (novaSenha !== confirmaSenha) {
//         return res.status(400).json({ error: "As novas senhas não coincidem." });
//     }
//     try {
//         const senhaCriptografada = await bcrypt.hash(novaSenha, saltRounds);

//         const [resultado] = await db.query(
//             "UPDATE usuarios SET senha = ? WHERE email = ?", 
//             [senhaCriptografada, email]
//         );

//         if (resultado.affectedRows === 0) {
//             return res.status(404).json({ error: "Usuário não encontrado ou senha inalterada." });
//         }

//         return res.status(200).json({ message: "Senha redefinida com sucesso!" });
        
//     } catch (error) {
//         console.error("Erro no BD ao redefinir senha:", error);
//         return res.status(500).json({ error: "Erro interno do servidor ao tentar redefinir a senha." });
//     }
// };