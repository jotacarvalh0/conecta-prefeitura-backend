import prisma from '../prisma';

export const SecretariaService = {
  async listarTodas() {
    return prisma.secretaria.findMany();
  },

  async buscarPorCategoria(categoria: string) {
    return prisma.secretaria.findMany({
      where: { categoria }
    });
  },

  async criar(data: { nome: string; categoria: string; descricao?: string }) {
    return prisma.secretaria.create({ data });
  },

  async atualizar(id: number, data: any) {
    return prisma.secretaria.update({
      where: { id },
      data
    });
  },

  async remover(id: number) {
    return prisma.secretaria.delete({
      where: { id }
    });
  }
};