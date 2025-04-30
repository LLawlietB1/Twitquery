import express from 'express';
import userRoutes from './routes/index.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API online!');
});

app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
