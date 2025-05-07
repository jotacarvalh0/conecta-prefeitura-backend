import { Request, Response } from 'express';
import { SecretariaService } from '../services/SecretariaService';

export const SecretariaController = {
  async listar(req: Request, res: Response) {
    try {
      const secretarias = await SecretariaService.listarTodas();
      res.json(secretarias);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar secretarias' });
    }
  },

  async filtrarPorCategoria(req: Request, res: Response) {
    try {
      const { categoria } = req.params;
      const secretarias = await SecretariaService.buscarPorCategoria(categoria);
      res.json(secretarias);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao filtrar secretarias' });
    }
  },

  async criar(req: Request, res: Response) {
    try {
      const secretaria = await SecretariaService.criar(req.body);
      res.status(201).json(secretaria);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar secretaria' });
    }
  },

  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const secretariaAtualizada = await SecretariaService.atualizar(Number(id), data);
      res.json(secretariaAtualizada);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar secretaria' });
    }
  },
  
  async remover(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await SecretariaService.remover(Number(id));
      res.status(204).send(); // No Content
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover secretaria' });
    }
  }
};