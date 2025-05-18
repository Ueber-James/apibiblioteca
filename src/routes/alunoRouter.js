import { Router } from 'express';
import { createAluno, listAlunos } from '../models/alunoModel.js';

const router = Router();

/** POST /api/alunos */
router.post('/', async (req, res, next) => {
  console.log('POST /api/alunos payload:', req.body);
  try {
    const aluno = await createAluno(req.body);
    res.status(201).json(aluno);
  } catch (err) {
    next(err);
  }
});


/** GET /api/alunos */
router.get('/', async (_req, res, next) => {
  try {
    const alunos = await listAlunos();
    res.json(alunos);
  } catch (err) {
    next(err);
  }
});

export default router;
