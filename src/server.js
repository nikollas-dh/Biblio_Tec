

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import usuarioRoutes from "./routes/usuario.routes.js";
import livrosRoutes from "./routes/livros.routes.js";
import avaliacoesRoutes from "./routes/avaliacoes.routes.js";
import reservasRoutes from "./routes/reservas.routes.js";
import favoritosRoutes from "./routes/favoritos.routes.js";

import turmaRoutes from "./routes/turma.routes.js";
import cursoRoutes from "./routes/curso.routes.js";

const app = express();
app.use(cors()); // CORS está ativado
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("🚀 API rodando com sucesso!");
});

// Todas as rotas agora começam com /api
app.use("/api/usuario", usuarioRoutes);
app.use("/api/livros", livrosRoutes);
app.use("/api/avaliacoes", avaliacoesRoutes);
app.use("/api/reservas", reservasRoutes);
app.use("/api/favoritos", favoritosRoutes);

app.use("/api/turma", turmaRoutes); // Rotas de turma em /api/turma
app.use("/api/curso", cursoRoutes); // Rotas de curso em /api/curso

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));