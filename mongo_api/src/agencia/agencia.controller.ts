import {
  Action,
  Authorized,
  Body,
  BodyParam,
  Get,
  JsonController,
  Param,
  Post,
  Req,
} from "routing-controllers";
import { Service } from "typedi";
import { AgenciaSchemaModel } from "./agencia.model";
import { AgenciaService } from "./agencia.service";
import { AgenciaRepository } from "./agencia.repository";
import * as JWT from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET ?? "";

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

  @Get()
  @Authorized()
  async checkAgencia(@Req() req: any) {
    const token = req.headers.authorization;
    const checking = await this.agenciaService.checkAgencia(token);
    return checking;
  }
}
