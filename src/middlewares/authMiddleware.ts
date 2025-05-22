import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';
import prisma from '../prisma';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const [bearer, token] = authHeader.split(' ');
    
    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({ error: 'Formato de token inválido' });
    }

    const decoded = verifyToken(token);
    const usuario = await prisma.usuario.findUnique({ 
      where: { id: decoded.id },
      select: {
        id: true,
        nome: true,
        email: true,
        isAdmin: true
      }
    });

    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    // Type assertion segura
    (req as unknown as { user?: typeof usuario }).user = usuario;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Type assertion segura
  const user = (req as unknown as { user?: { isAdmin: boolean } }).user;
  
  if (!user?.isAdmin) {
    return res.status(403).json({ error: 'Acesso negado. Somente administradores.' });
  }
  next();
};