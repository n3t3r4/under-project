import express, { Request, Response } from "express";
import {
  conteudoType,
  createConteudo,
  deleteConteudo,
  findConteudo,
  getContentByClientID,
} from "./contentService";

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
  const newConteudo = req.body;
  const createConteudos = await createConteudo(newConteudo);
  res.status(200).json({ success: true });
});

controllerConteudo.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleteContent = await deleteConteudo(id);
  res.status(200).json({ sucess: true });
});

controllerConteudo.get("/clientes/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const contentByClientID = await getContentByClientID(id);
  res.status(200).json(contentByClientID.rows);
});
