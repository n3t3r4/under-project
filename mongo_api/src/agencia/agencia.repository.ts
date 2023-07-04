import { Service } from "typedi";
import { AgenciaSchemaModel } from "./agencia.model";
import * as JWT from "jsonwebtoken";
import * as dotenv from "dotenv";
import {
  Action,
  ExpressErrorMiddlewareInterface,
  Middleware,
  UnauthorizedError,
} from "routing-controllers";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET ?? "";
// let testeLogin = {
//   email: "1@agencia.com",
//   senha: "senha",
// };
@Service()
export class AgenciaRepository {
  constructor() {}

  async findAgencias(email: string, senha: string) {
    const agencia = await AgenciaSchemaModel.findOne({
      email: email,
      senha: senha,
    }).lean();
    const user_data = { email: email, senha: senha };
    const jwt = JWT.sign({ data: user_data }, jwtSecret, { expiresIn: "10m" });
    const response =
      agencia === null
        ? { sucess: false, jwt: null }
        : { sucess: true, jwt: jwt };
    return response;
  }

  async checkAgencia(token: string) {
    const tokenSplited = token.split(" ")[1];
    const user_data = JWT.verify(tokenSplited, jwtSecret);
    return user_data;
  }
}

export async function authorizationChecker(action: Action) {
  const token = action.request.headers.authorization;
  const tokenSplited = token.split(" ")[1];
  const check = await checkingAuth(tokenSplited);
  if (check) {
    return true;
  } else {
    return false;
  }
}

export async function checkingAuth(token: string) {
  try {
    const user_data = JWT.verify(token, jwtSecret);
    if (user_data) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}

@Service()
@Middleware({ type: "after" })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  public error(
    error: any,
    request: any,
    response: any,
    next: (err: any) => any
  ) {
    if (response.headersSent) {
      return;
    }

    response.json(null);
  }
}
