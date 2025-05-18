import { Router } from 'express';
import { createAluno, listAlunos } from '../models/alunoModel.js';
import bcrypt from 'bcrypt';


const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const { matricula, nome } = req.body;
    
    // Validação básica
    if (!matricula || !nome) {
      return res.status(400).json({ error: 'Matrícula e nome são obrigatórios' });
    }
    
    const aluno = await createAluno({ matricula, nome });
    res.status(201).json(aluno);
  } catch (err) {
    console.error('[ERRO] createAluno:', err);
    next(err);
  }
});

router.get('/', async (_req, res, next) => {
  console.log('>> GET /api/alunos');
  try {
    res.json(await listAlunos());
  } catch (err) {
    console.error('!! ERRO listAlunos:', err);
    next(err);
  }
});

export default router;
