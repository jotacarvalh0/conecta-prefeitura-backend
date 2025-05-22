import express from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: number;
      nome: string;
      email: string;
      isAdmin: boolean;
    };
  }
}

const req = {} as express.Request;
req.user = {
  id: 1,
  nome: 'Test',
  email: 'test@test.com',
  isAdmin: true
};

console.log(req.user?.id);