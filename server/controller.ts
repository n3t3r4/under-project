import express, { Request, Response } from "express";
import { conteudoType, createConteudo, findConteudo } from "./service";

export const controllerConteudo = express.Router();

controllerConteudo.get("/", async (req: Request, res: Response) => {
  const conteudos = await findConteudo();
  res.status(200).json(conteudos);
});

let conteudoTeste: conteudoType = {
  agencia_id: 1,
  cliente_id: 1,
  titulo: "teste titulo",
  conteudo_post: "teste",
  data_publi: "2023-05-18",
  status: 1,
};
controllerConteudo.post("/", async (req: Request, res: Response) => {
  const createConteudos = await createConteudo(conteudoTeste);
  res.status(200).json(createConteudos);
});
