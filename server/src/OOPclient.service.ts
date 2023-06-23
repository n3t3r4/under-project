import { PrismaClient } from "@prisma/client";
import { Get } from "routing-controllers";
import { Service } from "typedi";

const prisma = new PrismaClient();

@Service()
export class ClientService {
  @Get()
  async findAllClientes() {
    console.log("TESTE");
    const response = await prisma.cliente.findMany();
    return response;
  }
}

// export async function findAllClientes() {
//   console.log("TESTE");
//   const response = await prisma.cliente.findMany();
//   return response;
// }
