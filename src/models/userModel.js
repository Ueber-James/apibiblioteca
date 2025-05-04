import { pool } from '../db.js';
import bcrypt from 'bcrypt';

export async function createUser(nome,username, plainPassword) {
  const hash = await bcrypt.hash(plainPassword, 10);
  const res = await pool.query(
    `INSERT INTO usuarios (nome, username, password) 
     VALUES ($1, $2, $3) RETURNING id, username`,
    [nome, username, hash]
  );
  return res.rows[0];
}

export async function findUserByUsername(username) {
  const res = await pool.query(
    `SELECT id, username, password FROM usuarios WHERE username = $1`,
    [username]
  );
  return res.rows[0];
}
