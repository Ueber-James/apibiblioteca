import { pool } from '../db.js';

/** Cria um livro */
export async function createLivro({ titulo, categoria, quantidade }) {
  const res = await pool.query(
    `INSERT INTO livros (titulo, categoria, quantidade)
     VALUES ($1, $2, $3)
     RETURNING id, titulo, categoria, quantidade`,
    [titulo, categoria, quantidade]
  );
  return res.rows[0];
}

/** Lista todos os livros */
export async function listLivros() {
  const res = await pool.query(
    `SELECT id, titulo, categoria, quantidade
     FROM livros`
  );
  return res.rows;
}

/** Ajusta quantidade de exemplares */
export async function updateQuantidade(id, delta) {
  const res = await pool.query(
    `UPDATE livros
     SET quantidade = quantidade + $2
     WHERE id = $1
     RETURNING id, titulo, categoria, quantidade`,
    [id, delta]
  );
  return res.rows[0];
}
