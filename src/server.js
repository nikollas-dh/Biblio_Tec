// ============================
//  Dependências
// ============================
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import alunosRoutes from "./routes/aluno.routes.js"
import livroRoutes from "./routes/livro.routes.js"


// ============================
//  Configuração do servidor
// ============================
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/",(req,res)=>{
  res.send("API rodando com sucesso")
})

app.use("/alunos", alunosRoutes)
app.use("/livros", livroRoutes)

// ============================
//  Inicia o servidor
// ============================
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));