import { JsonController, Get } from "routing-controllers";
import { Service } from "typedi";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
//oop
@Service()
@JsonController("/clientes")
export class ClientControllerClass {
  constructor() {}

  @Get()
  async findClientes() {
    const response = await prisma.cliente.findMany();
    return response;
  }
}
