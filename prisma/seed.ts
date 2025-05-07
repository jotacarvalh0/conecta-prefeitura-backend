// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criar secretarias
  const secretarias = await prisma.secretaria.createMany({
    data: [
      { nome: 'Educação', categoria: 'educacao' },
      { nome: 'Saúde', categoria: 'saude' },
      { nome: 'Cultura', categoria: 'cultura' },
    ],
  });

  // Criar alguns comunicados
  await prisma.comunicado.createMany({
    data: [
      {
        titulo: 'Reunião de pais',
        descricao: 'Dia 20/10 às 19h na escola municipal',
        secretariaId: 1
      },
      {
        titulo: 'Campanha de vacinação',
        descricao: 'Vacinação contra gripe no posto central',
        secretariaId: 2
      }
    ]
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });