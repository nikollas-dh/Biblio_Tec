// Este arquivo requer a instalação de:
// npm install nodemailer crypto bcrypt

import nodemailer from 'nodemailer';
import crypto from 'crypto';
import {db} from "../config/db.js"; // ⬅️ Adapte o caminho e o nome do seu arquivo de conexão com o banco
import bcrypt from 'bcrypt'; 

// -----------------------------------------------------------
// 📧 Configuração do Nodemailer (Adapte para seus dados)
// -----------------------------------------------------------
const transporter = nodemailer.createTransport({
    host: "seu_servidor_smtp.com", // Ex: smtp.gmail.com ou o servidor do seu provedor
    port: 587,
    secure: false, 
    auth: {
        user: "seu_email@exemplo.com", // Seu email de envio
        pass: "sua_senha_do_email_ou_app_password" // Sua senha/App Password
    }
});


// -----------------------------------------------------------
// 1. Controller para Solicitar o Código
// URL: POST /api/recuperar/solicitar
// -----------------------------------------------------------
export const solicitarRecuperacao = async (req, res) => {
    const { email } = req.body;

    // 1. Verificar se o e-mail existe
    // ⬅️ Adapte esta query SQL
    const [usuario] = await db.query('SELECT id, nome FROM usuario WHERE email = ?', [email]);
    
    if (!usuario || usuario.length === 0) {
        // Por segurança, retorna sucesso, mesmo que o e-mail não exista.
        return res.status(200).json({ 
            message: "Se o e-mail estiver registrado, o código de recuperação será enviado." 
        });
    }

    // 2. Gerar Token de Recuperação
    // Usamos um token longo, mas enviamos apenas os 6 primeiros dígitos como 'código'
    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiracao = new Date(Date.now() + 3600000); // Token válido por 1 hora (3600000 ms)
    const codigoEmail = resetToken.substring(0, 6).toUpperCase();

    // 3. Salvar o Token no Banco de Dados
    // ⬅️ Adapte esta query SQL para salvar o token e a expiração na sua tabela 'usuario'
    try {
        await db.query(
            'UPDATE usuario SET reset_token = ?, token_expiracao = ? WHERE id = ?',
            [resetToken, tokenExpiracao, usuario[0].id]
        );
    } catch (dbError) {
        console.error("Erro ao salvar o token no banco:", dbError);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }

    // 4. Enviar o E-mail
    const mailOptions = {
        from: '"Sua Aplicação" <seu_email@exemplo.com>',
        to: email,
        subject: 'Código de Redefinição de Senha',
        html: `<p>Você solicitou a redefinição de senha.</p>
               <p>Seu código de recuperação é: <strong>${codigoEmail}</strong></p>
               <p>Este código expira em 1 hora.</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ 
            message: "Código de recuperação enviado com sucesso!" 
        });
    } catch (mailError) {
        console.error("Erro ao enviar e-mail:", mailError);
        res.status(500).json({ error: "Erro ao enviar o e-mail de recuperação." });
    }
};


// -----------------------------------------------------------
// 2. Controller para Redefinir a Senha
// URL: POST /api/recuperar/redefinir
// -----------------------------------------------------------
export const redefinirSenha = async (req, res) => {
    const { email, codigo, novaSenha } = req.body;

    // 1. Buscar usuário pelo e-mail e verificar o código e expiração
    // Aqui procuramos um token que comece com os 6 dígitos do código e que não esteja expirado.
    // ⬅️ Adapte esta query SQL
    const [usuario] = await db.query(
        `SELECT id, reset_token, token_expiracao FROM usuario 
         WHERE email = ? AND reset_token LIKE ? AND token_expiracao > NOW()`, 
        [email, `${codigo.toLowerCase()}%`] // Busca se o código corresponde ao início do token
    );

    if (!usuario || usuario.length === 0) {
        return res.status(400).json({ error: "Código inválido ou expirado." });
    }

    // 2. Hashear a Nova Senha
    const hashedPassword = await bcrypt.hash(novaSenha, 10);

    // 3. Atualizar a senha e invalidar o token de recuperação
    // ⬅️ Adapte esta query SQL
    try {
        await db.query(
            `UPDATE usuario SET senha = ?, reset_token = NULL, token_expiracao = NULL WHERE id = ?`,
            [hashedPassword, usuario[0].id]
        );
        res.status(200).json({ message: "Senha redefinida com sucesso!" });
    } catch (dbError) {
        console.error("Erro ao redefinir a senha no banco:", dbError);
        res.status(500).json({ error: "Erro interno do servidor ao redefinir a senha." });
    }
};