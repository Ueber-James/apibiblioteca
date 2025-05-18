import { pool } from '../db.js';

/** Registra um novo empréstimo */
export async function createEmprestimo({ matricula, livro_id, data_retirada }) {
  const res = await pool.query(
    `INSERT INTO emprestimo_livros (matricula, livro_id, data_retirada)
     VALUES ($1, $2, $3)
     RETURNING id, matricula, livro_id, data_retirada`,
    [matricula, livro_id, data_retirada]
  );
  return res.rows[0];
}

/** Lista todos os empréstimos */
export async function listEmprestimos() {
  const res = await pool.query(
    `SELECT e.id, e.matricula, a.nome AS nome_aluno,
            e.livro_id, l.titulo AS titulo_livro,
            e.data_retirada
     FROM emprestimo_livros e
     JOIN aluno a ON a.matricula = e.matricula
     JOIN livros l ON l.id = e.livro_id
     ORDER BY e.data_retirada DESC`
  );
  return res.rows;
}

/** Exclui um empréstimo */
export async function deleteEmprestimo(id) {
  await pool.query(
    `DELETE FROM emprestimo_livros WHERE id = $1`,
    [id]
  );
}
