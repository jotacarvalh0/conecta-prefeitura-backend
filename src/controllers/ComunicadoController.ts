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
  }
};