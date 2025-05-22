import { Request, Response } from 'express';
import { UsuarioService } from '../services/UsuarioService';

export const UsuarioController = {
  async criar(req: Request, res: Response) {
    try {
      const usuario = await UsuarioService.criar(req.body);
      res.status(201).json(usuario);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      res.status(400).json({ error: message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      const resultado = await UsuarioService.login(email, senha);
      res.json(resultado);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      res.status(401).json({ error: message });
    }
  },

  async perfil(req: Request, res: Response) {
  try {
    // Verificação segura com type assertion
    const userId = (req as unknown as { user?: { id: number } }).user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Não autenticado' });
    }

    const usuario = await UsuarioService.buscarPorId(userId);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      isAdmin: usuario.isAdmin
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
}
};