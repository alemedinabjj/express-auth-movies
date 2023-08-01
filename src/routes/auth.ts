import { Request, Response, Router } from 'express';
import prisma from '../prisma/db';
import { verifyToken } from '../middlewares/verifyToken';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  const hashedPassword = await bcrypt.hash(senha, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        senha: hashedPassword,
      },
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar usuário.' });
  }
}
);

router.post('/login', async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const passwordMatch = await bcrypt.compare(senha, user.senha);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
});


router.post('/', verifyToken, async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.userId,
    },
  });

  res.json(user);
}
);


export default router;