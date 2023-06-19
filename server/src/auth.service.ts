import { PrismaClient } from "@prisma/client";
import * as JWT from "jsonwebtoken";

require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET ?? "";

type emailPassword = {
  email: string;
  senha: string;
};

export async function findAgenciaByEmailPassword({
  email,
  senha,
}: emailPassword) {
  const prisma = new PrismaClient();
  const checking = await prisma.agencia.findFirst({
    where: {
      email,
      senha,
    },
  });
  const user_data = { email: email, senha: senha };
  const jwt = JWT.sign({ data: user_data }, jwtSecret, { expiresIn: "1m" });
  const response =
    checking === null
      ? { sucess: false, jwt: null }
      : { sucess: true, jwt: jwt };
  return response;
}

export function readToken(token: string): JWT.JwtPayload | null {
  try {
    const user_data = JWT.verify(token, jwtSecret);
    console.log("auth sucess");
    return user_data as any;
  } catch (error) {
    console.log(error);
    return null;
  }
}
