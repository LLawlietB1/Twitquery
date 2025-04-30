import connection from '../db/index.js';
import bcrypt from 'bcrypt';
import { isEmailValid } from '../utils/index.js';

export async function getUsers(req, res) {
  try {
    const [rows] = await connection.query('SELECT * FROM users');
    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: 'Nenhum usuário encontrado' });
    }
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

export async function createUser(req, res) {
  const { name, email, password } = req.body;

  if (!name || name.length <= 3) {
    return res.status(400).json({ error: 'Nome deve conter 3 ou mais caracteres' });
  }
  if (!email || !isEmailValid(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }
  if (!password) {
    return res.status(400).json({ error: 'Senha é obrigatória' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await connection.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    res.status(201).json({ id: result.insertId, name, email });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email já cadastrado' });
    }
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

export async function updateUser(req, res) {
  const { id } = req.params;
  const { name, email, password } = req.body;

  if (!name || name.length <= 3) {
    return res.status(400).json({ error: 'Nome deve conter 3 ou mais caracteres' });
  }
  if (!email || !isEmailValid(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }
  if (!password) {
    return res.status(400).json({ error: 'Senha é obrigatória' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await connection.query(
      'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
      [name, email, hashedPassword, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json({ id, name, email });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}
