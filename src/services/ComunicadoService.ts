import prisma from '../prisma';

export const ComunicadoService = {
  async listar(secretariaId?: number, pagina = 1, limite = 10) {
    const skip = (pagina - 1) * limite;
    
    return prisma.comunicado.findMany({
      where: secretariaId ? { secretariaId } : undefined,
      include: { secretaria: true },
      orderBy: { dataPublicacao: 'desc' },
      skip,
      take: limite
    });
  },

  async buscarPorId(id: number) {
    return prisma.comunicado.findUnique({
      where: { id },
      include: { secretaria: true }
    });
  },

  async criar(data: { titulo: string; descricao: string; secretariaId: number }) {
    return prisma.comunicado.create({ 
      data: {
        ...data,
        dataPublicacao: new Date()
      } 
    });
  },

  async atualizar(id: number, data: any) {
    return prisma.comunicado.update({
      where: { id },
      data
    });
  },

  async remover(id: number) {
    return prisma.comunicado.delete({
      where: { id }
    });
  }
};