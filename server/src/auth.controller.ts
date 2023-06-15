import express, { Request, Response } from "express";
import { findAgenciaByEmailPassword } from "./auth.service";

export const controllerAuth = express.Router();

controllerAuth.post("/", async (req: Request, res: Response) => {
  const emailPassword = req.body;
  const check = await findAgenciaByEmailPassword(emailPassword);
  console.log(check);
  const response =
    check === null
      ? { sucess: false, jwt: null }
      : { sucess: true, jwt: "TOKEN_AQUI" };
  console.log(response);
  res.json(response);
});
