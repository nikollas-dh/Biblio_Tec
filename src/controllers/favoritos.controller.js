import {db} from "../config/db.js";

export async function listarFavoritos(req, res) {
    try {       
        try {
            // Query SQL para listar todos os livros favoritos com informações relacionadas
            const query = `
                SELECT 
                    f.id,
                    f.usuario_id,
                    f.livro_id,
                    f.criado_em,
                    u.nome as usuario_nome,
                    u.email as usuario_email,
                    l.titulo as livro_titulo,
                    l.autor as livro_autor,
                    l.isbn as livro_isbn,
                    l.ano_publicacao as livro_ano_publicacao,
                    l.disponivel as livro_disponivel
                FROM favoritos f
                LEFT JOIN usuarios u ON f.usuario_id = u.id
                LEFT JOIN livros l ON f.livro_id = l.id
                ORDER BY f.criado_em DESC
            `;
            
            const [favoritos] = await db.execute(query);
            
            // Retornar sucesso com a lista de favoritos
            return res.status(200).json({
                sucesso: true,
                mensagem: 'Livros favoritos listados com sucesso',
                total: favoritos.length,
                dados: favoritos
            });
            
        } finally {
            // Liberar a conexão
            db.release();
        }
        
    } catch (erro) {
        console.error('Erro ao listar livros favoritos:', erro);
        return res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao listar livros favoritos',
            erro: erro.message
        });
    }
}

export async function criarFavoritos(req, res) {
    try {
        // Extrair dados do corpo da requisição
        const { usuario_id, livro_id} = req.body;
        
        // Validação dos campos obrigatórios
        if (!usuario_id || !livro_id) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Campos obrigatórios: usuario, livro'
            });
        }
        
        // --- INÍCIO: O BLOCO try/finally ANINHADO FOI REMOVIDO ---
        
        // 1. Verificar se o usuário existe
        const [usuarios] = await db.execute(
            'SELECT id FROM usuarios WHERE id = ?',
            [usuario_id]
        );
        
        if (usuarios.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Usuário não encontrado'
            });
        }
        
        // 2. Verificar se o livro existe
        const [livros] = await db.execute(
            'SELECT id FROM livros WHERE id = ?',
            [livro_id]
        );
        
        if (livros.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Livro não encontrado'
            });
        }
        
        // 3. Verificar se o livro já está nos favoritos do usuário
        const [favoritoExistente] = await db.execute(
            'SELECT id FROM favoritos WHERE usuario_id = ? AND livro_id = ?',
            [usuario_id, livro_id]
        );
        
        if (favoritoExistente.length > 0) {
            return res.status(409).json({
                sucesso: false,
                mensagem: 'Este livro já está nos favoritos do usuário'
            });
        }
        
        // 4. Inserir o novo favorito
        const query = `
            INSERT INTO favoritos 
            (usuario_id, livro_id, data_favoritado) 
            VALUES (?, ?, NOW())
        `;
        
        const [resultado] = await db.execute(query, [
            usuario_id,
            livro_id
        ]);
        
        // 5. Buscar o favorito criado com informações completas
        const [favoritoCriado] = await db.execute(
            `SELECT 
                f.id,
                f.usuario_id,
                f.livro_id,
                f.criado_em,
                u.nome as usuario_nome,
                u.email as usuario_email,
                l.titulo as livro_titulo,
                l.autor as livro_autor,
                l.isbn as livro_isbn,
                l.ano_publicacao as livro_ano_publicacao,
                l.disponivel as livro_disponivel
            FROM favoritos f
            LEFT JOIN usuarios u ON f.usuario_id = u.id
            LEFT JOIN livros l ON f.livro_id = l.id
            WHERE f.id = ?`,
            [resultado.insertId]
        );
        
        // 6. Resposta de sucesso (201)
        return res.status(201).json({
            sucesso: true,
            mensagem: 'Livro adicionado aos favoritos com sucesso',
            dados: favoritoCriado[0]
        });
        
        // --- FIM: O código foi simplificado para um único bloco try/catch ---
        
    } catch (erro) {
        console.error('Erro ao criar favorito:', erro);
        // Este catch agora só será atingido se uma das operações db.execute() falhar
        return res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao adicionar livro aos favoritos',
            //erro: erro.message
        });
    }
}

export async function deletarFavorito (req, res){
    try {
    await db.execute("DELETE FROM favoritos WHERE id = ?", [req.params.id]);
    res.json({ mensagem: "Livro removido dos favoritos com sucesso!" });
    } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}