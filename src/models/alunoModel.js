import { pool } from '../db.js';

/** Cria um aluno */
export async function createAluno({ matricula, nome }) {
  const res = await pool.query(
    `INSERT INTO aluno (matricula, nome)
     VALUES ($1, $2)
     RETURNING id, matricula, nome`,
    [matricula, nome]
  );
  return res.rows[0];
}

/** Lista todos os alunos */
export async function listAlunos() {
  const res = await pool.query(
    `SELECT matricula, nome, livros_emprestados
     FROM aluno`
  );
  return res.rows;
}

/** Atualiza contador de livros emprestados */
export async function updateEmprestados(matricula, delta) {
  const res = await pool.query(
    `UPDATE aluno
     SET livros_emprestados = livros_emprestados + $2
     WHERE matricula = $1
     RETURNING matricula, nome, livros_emprestados`,
    [matricula, delta]
  );
  return res.rows[0];
}
