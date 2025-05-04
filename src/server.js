import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';          // ← importe

import userRoutes from './routes/userRoutes.js';
import agendamentoRoutes from './routes/agendamentoRoutes.js';

dotenv.config();
const app = express();

app.use(cors());                  // ← habilita CORS para todo front (dev)

app.use(express.json());

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/agendamentos', agendamentoRoutes);

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno' });
});

// Inicia servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server rodando na porta ${PORT}`);
});
