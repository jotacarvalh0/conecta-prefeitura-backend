import { Request, Response } from 'express';
import { ComunicadoService } from '../services/ComunicadoService';

export const ComunicadoController = {
  async listar(req: Request, res: Response): Promise<void> {
    try {
      const { secretariaId, pagina = '1', limite = '10' } = req.query;
      
      const comunicados = await ComunicadoService.listar({
        secretariaId: secretariaId ? Number(secretariaId) : undefined,
        pagina: Number(pagina),
        limite: Number(limite)
      });
      
      res.json(comunicados);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar comunicados' });
    }
  },

  async listarPorSecretaria(req: Request, res: Response) {
    try {
      const { secretariaId } = req.params;
      const { pagina = '1', limite = '10' } = req.query;
      
      const comunicados = await ComunicadoService.listarPorSecretaria(
        Number(secretariaId),
        Number(pagina),
        Number(limite)
      );
      
      res.json(comunicados);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar comunicados da secretaria' });
    }
  },

  async buscarPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const comunicado = await ComunicadoService.buscarPorId(Number(id));
      
      if (!comunicado) {
        res.status(404).json({ error: 'Comunicado não encontrado' });
        return;
      }
      
      res.json(comunicado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar comunicado' });
    }
  },

  async criar(req: Request, res: Response): Promise<void> {
    try {
      const { titulo, descricao, secretariaId } = req.body;
      const novoComunicado = await ComunicadoService.criar({
        titulo,
        descricao,
        secretariaId: Number(secretariaId),
      });
      res.status(201).json(novoComunicado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar comunicado' });
    }
  },

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const dadosAtualizados = req.body;
      const comunicado = await ComunicadoService.atualizar(Number(id), dadosAtualizados);
      res.json(comunicado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar comunicado' });
    }
  },

  async remover(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await ComunicadoService.remover(Number(id));
      res.status(204).send(); // Resposta sem conteúdo (sucesso)
    } catch (error) {
      res.status(500).json({ error: 'Erro ao remover comunicado' });
    }
  },
};