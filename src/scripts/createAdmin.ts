import { UsuarioService } from '../services/UsuarioService';

async function createAdmin() {
  try {
    await UsuarioService.criar({
      nome: 'Admin',
      email: 'admin@prefeitura.com',
      senha: 'admin123',
      isAdmin: true,
    });
    console.log('Administrador criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar administrador:', error);
  }
}

createAdmin();