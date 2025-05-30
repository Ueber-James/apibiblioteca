// src/app.js (ou server.js)
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import alunoRouter from './routes/alunoRouter.js';
import livrosRouter from './routes/livrosRouter.js';
import emprestimoRouter from './routes/emprestimoRouter.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/alunos', alunoRouter);
app.use('/api/livros', livrosRouter);
app.use('/api/emprestimos', emprestimoRouter);

// Tratamento de erros
app.use((err, _req, res, _next) => {
  console.error('!! ERRO GLOBAL:', err);
  res.status(500).json({ error: 'Erro interno' });
});

// Inicia servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server rodando na porta ${PORT}`);
});
