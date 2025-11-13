import {db} from "../config/db.js";


export async function criarAvaliacao (req, res){
    try {
        const { usuario_id, livro_id, nota, comentario } = req.body;
        
        const notaDecimal = Number.parseFloat(Number(nota).toFixed(1))
        if (!usuario_id || !livro_id || !nota) return res.status(400).json({ erro: "Preencha os campos obrigatórios" });

        if(nota >10 || nota <0){
            return res.status(400).json({erro:"Por favor, a nota deve ser maior que 0 e menor que 10."})
        }
        const [resultado] = await db.execute(
            "SELECT * from avaliacoes WHERE usuario_id = ? AND livro_id = ?",
            [usuario_id, livro_id]
        );

        console.log(resultado)
        if(resultado.length > 0){
            return res.status(200).json({msg:"Usuario ja fez avaliação ."})
        }
        const [inserir] = await db.execute(
            "INSERT INTO avaliacoes (usuario_id, livro_id, nota, comentario) VALUES (?, ?, ?, ?)",
            [usuario_id, livro_id, notaDecimal, comentario]
        );

        console.log(inserir)

        if(inserir.affectedRows >= 1){
             res.status(200).json({ mensagem: "Avaliação criada com sucesso!" ,
                id: inserir.insertId
             });
        }else{
            res.status(500).json({ erro: err.message });
        }

       
    } catch (err) {
        res.status(500).json({ erro: err.message });
        res.send("Erro ao solicitar requisição")
    }
};

export async function listarAvaliacoes (req, res){
  try {
    const [rows] = await db.execute("SELECT * FROM avaliacoes");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};