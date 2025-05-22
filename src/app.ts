import express from 'express';
import cors from 'cors';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Middleware de erro (deve vir depois das rotas)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});
