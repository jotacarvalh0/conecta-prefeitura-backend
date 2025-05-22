import { Router, Request, Response, NextFunction } from 'express';
import { SecretariaController } from '../controllers/SecretariaController';
import { ComunicadoController } from '../controllers/ComunicadoController';
import { UsuarioController } from '../controllers/UsuarioController';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Rotas públicas
router.post('/usuarios', (req: Request, res: Response) => UsuarioController.criar(req, res));
router.post('/login', (req: Request, res: Response) => UsuarioController.login(req, res));
router.get('/secretarias', SecretariaController.listar);
router.get('/secretarias/categoria/:categoria', SecretariaController.filtrarPorCategoria);
router.get('/secretarias/:secretariaId/comunicados', ComunicadoController.listarPorSecretaria);
router.get('/comunicados', ComunicadoController.listar);
router.get('/comunicados/:id', ComunicadoController.buscarPorId);

// Middleware de autenticação
router.use((req: Request, res: Response, next: NextFunction) => {
  return authMiddleware(req, res, next);
});

// Rotas autenticadas
router.get('/perfil', (req: Request, res: Response) => UsuarioController.perfil(req, res));

// Middleware de admin
router.use((req: Request, res: Response, next: NextFunction) => {
  return adminMiddleware(req, res, next);
});

// Rotas de admin
router.post('/secretarias', SecretariaController.criar);
router.put('/secretarias/:id', SecretariaController.atualizar);
router.delete('/secretarias/:id', SecretariaController.remover);
router.post('/comunicados', ComunicadoController.criar);
router.put('/comunicados/:id', ComunicadoController.atualizar);
router.delete('/comunicados/:id', ComunicadoController.remover);

export default router;