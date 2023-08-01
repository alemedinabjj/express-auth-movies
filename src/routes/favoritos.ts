import { Request, Response, Router } from 'express';
import prisma from '../prisma/db';
import { verifyToken } from '../middlewares/verifyToken';

const router = Router();

interface FilmeCreateInput {
  titulo: string;
  diretor: string;
  ano: number;
  favorito: boolean;
  userId: number;
}

router.post('/', verifyToken, async (req: Request, res: Response) => {
  const { titulo, diretor, ano } = req.body;
  const userId = req.userId as number;

  try {

    const filmeData: FilmeCreateInput = {
      titulo,
      diretor,
      ano,
      favorito: true,
      userId,
    };

    const filme = await prisma.filme.create({
      data: filmeData,
    });
    res.json(filme);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao salvar filme.' });
  }

});


router.get('/', verifyToken, async (req: Request, res: Response) => {
  const userId = req.userId as number;

  try {
    const filmes = await prisma.filme.findMany({
      where: {
        // @ts-ignore
        userId: userId
      },
    });

    res.json(filmes);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar filmes.' });
  }
});

export default router;
