import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  id: number;
  isAdmin: boolean;
}

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET não está definido no arquivo .env');
}

export const generateToken = (userId: number, isAdmin: boolean): string => {
  const payload: JwtPayload = { id: userId, isAdmin };
  return jwt.sign(
    payload,
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
  );
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};