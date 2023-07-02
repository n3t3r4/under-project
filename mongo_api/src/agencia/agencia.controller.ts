import {
  Body,
  BodyParam,
  Get,
  JsonController,
  Param,
  Post,
} from "routing-controllers";
import { Service } from "typedi";
import { AgenciaSchemaModel } from "./agencia.model";
import { AgenciaService } from "./agencia.service";
import { AgenciaRepository } from "./agencia.repository";

@Service()
@JsonController("/login")
export class AgenciaController {
  constructor(private readonly agenciaService: AgenciaService) {
    this.agenciaService = new AgenciaService(new AgenciaRepository());
  }

  @Post()
  async findAgencia(
    @BodyParam("email") email: string,
    @BodyParam("senha") senha: string
  ) {
    const agencias = await this.agenciaService.findAgencias(email, senha);
    return agencias;
  }
}
