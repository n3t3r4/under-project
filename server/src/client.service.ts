import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function findClientes() {
  const response = await prisma.cliente.findMany();
  return response;
}

export type clienteType = {
  email: string;
  senha: string;
  agencia_id: number;
};

export async function createCliente(conteudo: clienteType) {
  const response = await prisma.cliente.create({
    data: {
      email: conteudo.email,
      senha: conteudo.senha,
      agencia_id: conteudo.agencia_id,
    },
  });
  return response;
}

export async function deleteCliente(id: number) {
  const response = await prisma.cliente.delete({
    where: {
      id: id,
    },
  });
  return response;
}
