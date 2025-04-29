import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'abacaxi123+-*', 
    database: 'app_users'  
})

function isEmailValid(email) { 
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

app.get('/', (req, res) => {
    res.send('API online!');
});

app.get('/users', async (req, res) => {
    try {
        const [rows] = await connection.query ('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }   
});
app.post('/users', async (req, res) => {
    const { name, email, password} = req.body;

    if(!name || name.length <= 3) {
        return res.status(400).json({ error: 'Nome deve conter 3 ou mais caracteres' });
    }
    if(!email || !isEmailValid(email)) {
        return res.status(400).json({ error: 'Email inválido' });
    }
    if(!password) {
        return res.status(400).json({ error: 'Senha é obrigatória' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
        res.status(201).json({ id: result.insertId, name, email });
    }
    catch (error) {
        console.error('Erro ao criar usuário:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Email já cadastrado' });
        }
        res.status(500).json({ error: 'Erro interno no servidor' });
    }

});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
