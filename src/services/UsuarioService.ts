import bcrypt from 'bcryptjs';
import prisma from '../prisma';
import { generateToken } from '../utils/auth';

export const UsuarioService = {
  async criar(data: { nome: string; email: string; senha: string; isAdmin?: boolean }) {
    const senhaHash = await bcrypt.hash(data.senha, 10);
    
    return prisma.usuario.create({
      data: {
        ...data,
        senha: senhaHash,
        isAdmin: data.isAdmin || false,
      },
    });
  },

  async login(email: string, senha: string) {
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    
    if (!senhaValida) {
      throw new Error('Senha inválida');
    }

    const token = generateToken(usuario.id, usuario.isAdmin);
    
    return {
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        isAdmin: usuario.isAdmin,
      },
      token,
    };
  },

  async buscarPorId(id: number) {
    return prisma.usuario.findUnique({ where: { id } });
  },
};