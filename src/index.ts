import express, { Application } from 'express';
import filmesRoutes from './routes/favoritos';
import authRoutes from './routes/auth';

const app: Application = express();
app.use(express.json());

app.use('/favoritos', filmesRoutes);

app.use('/auth', authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});
