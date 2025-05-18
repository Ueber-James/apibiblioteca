import { Router } from 'express';
import { createLivro, listLivros } from '../models/livrosModel.js';

const router = Router();

/** POST /api/livros */
router.post('/', async (req, res, next) => {
  try {
    const livro = await createLivro(req.body);
    res.status(201).json(livro);
  } catch (err) {
    next(err);
  }
});

/** GET /api/livros */
router.get('/', async (_req, res, next) => {
  try {
    const livros = await listLivros();
    res.json(livros);
  } catch (err) {
    next(err);
  }
});

export default router;
