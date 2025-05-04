import { Router } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createUser, findUserByUsername } from '../models/userModel.js';
import bcrypt from 'bcrypt';

dotenv.config();
const router = Router();

// Registro
router.post('/register', async (req, res, next) => {
  try {
    const {nome,  username, password } = req.body;
    const user = await createUser(nome, username, password);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await findUserByUsername(username);
    if (!user) return res.status(404).json({ error: 'Usuário não existe' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Senha incorreta' });

    const token = jwt.sign(
      { sub: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
});

export default router;
