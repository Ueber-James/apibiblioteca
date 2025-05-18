import { Router } from 'express';
import { createAluno, listAlunos } from '../models/alunoModel.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    console.log('Dados recebidos:', req.body); // ← Log de depuração
    const aluno = await createAluno(req.body);
    res.status(201).json(aluno);
  } catch (err) {
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
