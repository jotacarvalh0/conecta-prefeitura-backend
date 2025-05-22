import { Usuario } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: Pick<Usuario, 'id' | 'nome' | 'email' | 'isAdmin'>;
    }
  }
}