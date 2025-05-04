import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';          

import userRoutes from './routes/userRoutes.js';


dotenv.config();
const app = express();

app.use(cors());                  

app.use(express.json());

// Rotas
app.use('/api/users', userRoutes);


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
