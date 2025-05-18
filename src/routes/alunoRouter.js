import { Router } from 'express';
import { createAluno, listAlunos } from '../models/alunoModel.js';

const router = Router();

router.post('/', async (req, res, next) => {
  console.log('>> Recebido POST /api/alunos', req.body);
  try {
    const aluno = await createAluno(req.body);
    console.log('>> Criado no DB:', aluno);
    res.status(201).json(aluno);
  } catch (err) {
    console.error('!! ERRO createAluno:', err);
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
