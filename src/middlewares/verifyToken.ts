import { Request, Response } from "express";
const jwt = require('jsonwebtoken');

interface CustomRequest extends Request {
  userId?: number;
}


export function verifyToken(req: CustomRequest, res: Response, next: any) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.id;
    console.log(payload);
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Token inválido.' });
  }
}