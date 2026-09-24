import express from 'express';
import entregasRouter from './src/routes/EntregasRoutes.js';

const app = express();
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api', entregasRouter);

app.use((req, res) => {
  res.status(404).json({ erro: 'recurso não encontrado' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Delivery Tracker rodando em http://localhost:${PORT}`);
});
