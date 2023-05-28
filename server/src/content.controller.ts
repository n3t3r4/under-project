import express, { Request, Response } from "express";
import {
  conteudoType,
  createConteudo,
  deleteConteudo,
  findConteudoDesc,
  findConteudoAsc,
  getContentByClientID,
} from "./content.service";

export const controllerConteudo = express.Router();

controllerConteudo.get("/", async (req: Request, res: Response) => {
  const offset = req.query.offset ? Number(req.query.offset) : null;
  const limit = req.query.limit ? Number(req.query.limit) : null;
  const order = req.query.order;
  const conteudos =
    order === undefined || order === "desc"
      ? await findConteudoDesc(offset, limit)
      : await findConteudoAsc(offset, limit);

  res.status(200).json(conteudos);
});

controllerConteudo.get("/search", async (req: Request, res: Response) => {
  const searchContent = req.query.search;
  const conteudos = await findConteudoDesc();
  const searched = conteudos.filter(({ conteudo_post }) => {
    return conteudo_post == searchContent;
  });
  res.status(200).json(searched);
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
