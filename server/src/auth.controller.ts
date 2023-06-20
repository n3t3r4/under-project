import express, { Request, Response } from "express";
import { findAgenciaByEmailPassword, readToken } from "./auth.service";

export const controllerAuth = express.Router();

controllerAuth.post("/", async (req: Request, res: Response) => {
  const emailPassword = req.body;
  const response = await findAgenciaByEmailPassword(emailPassword);
  // console.log(response);
  res.json(response);
});

controllerAuth.get("/", async (req: Request, res: Response) => {
  const token = req.headers.authorization ?? " ";
  const tokenSplited = token.split(" ")[1];
  const user_data = readToken(tokenSplited);
  res.json(user_data);
});
