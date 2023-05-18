import express, { Request, Response } from "express";
import { findConteudo } from "./service";

export const controllerConteudo = express.Router();

controllerConteudo.get("/", async (req: Request, res: Response) => {
  const conteudos = await findConteudo();
  res.status(200).json(conteudos);
});
