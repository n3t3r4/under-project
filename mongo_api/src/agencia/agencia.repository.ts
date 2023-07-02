import { Service } from "typedi";
import { AgenciaSchemaModel } from "./agencia.model";
import * as JWT from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

// let testeLogin = {
//   email: "1@agencia.com",
//   senha: "senha",
// };
@Service()
export class AgenciaRepository {
  constructor() {}

  async findAgencias(email: string, senha: string) {
    const jwtSecret = process.env.JWT_SECRET ?? "";
    const agencia = await AgenciaSchemaModel.findOne({
      email: email,
      senha: senha,
    }).lean();
    const user_data = { email: email, senha: senha };
    const jwt = JWT.sign({ data: user_data }, jwtSecret, { expiresIn: "1m" });
    const response =
      agencia === null
        ? { sucess: false, jwt: null }
        : { sucess: true, jwt: jwt };
    return response;
  }
}
