import { Router } from 'express';
import { SecretariaController } from '../controllers/SecretariaController';
import { ComunicadoController } from '../controllers/ComunicadoController';

const router = Router();

// Rotas de Secretaria
router.get('/secretarias', SecretariaController.listar);
router.get('/secretarias/categoria/:categoria', SecretariaController.filtrarPorCategoria);
router.post('/secretarias', SecretariaController.criar);
router.put('/secretarias/:id', SecretariaController.atualizar);
router.delete('/secretarias/:id', SecretariaController.remover);
router.get('/secretarias/:secretariaId/comunicados', ComunicadoController.listarPorSecretaria);

// Rotas de Comunicado
router.get('/comunicados', ComunicadoController.listar);
router.get('/comunicados/:id', ComunicadoController.buscarPorId);
router.post('/comunicados', ComunicadoController.criar);
router.put('/comunicados/:id', ComunicadoController.atualizar); 
router.delete('/comunicados/:id', ComunicadoController.remover); 

export default router;