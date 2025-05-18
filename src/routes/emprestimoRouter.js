import { Router } from 'express';
import {
  createEmprestimo,
  listEmprestimos,
  deleteEmprestimo
} from '../models/emprestimoModel.js';
import { updateEmprestados } from '../models/alunoModel.js';
import { updateQuantidade } from '../models/livrosModel.js';

const router = Router();

/** POST /api/emprestimos */
router.post('/', async (req, res, next) => {
  const { matricula, livro_id, data_retirada } = req.body;
  try {
    // 1) registra empréstimo
    const emp = await createEmprestimo({ matricula, livro_id, data_retirada });
    // 2) atualiza contador no aluno (+1)
    await updateEmprestados(matricula, +1);
    // 3) decrementa estoque do livro (-1)
    await updateQuantidade(livro_id, -1);
    res.status(201).json(emp);
  } catch (err) {
    next(err);
  }
});

/** GET /api/emprestimos */
router.get('/', async (_req, res, next) => {
  try {
    const lista = await listEmprestimos();
    res.json(lista);
  } catch (err) {
    next(err);
  }
});

/** DELETE /api/emprestimos/:id */
router.delete('/:id', async (req, res, next) => {
  try {
    // opcional: buscar antes o empréstimo para ajustar contadores...
    await deleteEmprestimo(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

export default router;
