import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { titulo, diretor, ano } = req.body;
  try {
    const filme = await prisma.filme.create({
      data: {
        titulo,
        diretor,
        ano,
        favorito: true,
      },
    });
    res.json(filme);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao adicionar filme aos favoritos.' });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const filmes = await prisma.filme.findMany({
      where: {
        favorito: true,
      },
    });
    res.json(filmes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter lista de filmes favoritos.' });
  }
});

export default router;
