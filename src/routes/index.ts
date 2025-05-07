import { Router } from 'express';
import { SecretariaController } from '../controllers/SecretariaController';
import { ComunicadoController } from '../controllers/ComunicadoController';

const router = Router();

// Rotas de Secretaria
router.get('/secretarias', SecretariaController.listar);
router.get('/secretarias/categoria/:categoria', SecretariaController.filtrarPorCategoria);
router.post('/secretarias', SecretariaController.criar);

// Rotas de Comunicado
router.get('/comunicados', ComunicadoController.listar);
router.get('/comunicados/:id', ComunicadoController.buscarPorId);

export default router;