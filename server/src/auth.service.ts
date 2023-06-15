import { PrismaClient } from "@prisma/client";

type emailPassword = {
  email: string;
  senha: string;
};

export async function findAgenciaByEmailPassword({
  email,
  senha,
}: emailPassword) {
  const prisma = new PrismaClient();
  const response = await prisma.agencia.findFirst({
    where: {
      email,
      senha,
    },
  });
  return response;
}
