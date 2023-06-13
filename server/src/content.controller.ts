import express, { Request, Response } from "express";
import {
  // contentServiceClass,
  conteudoType,
  createConteudo,
  deleteConteudo,
  findConteudo,
  getContentByClientID,
} from "./content.service";
import { Service } from "typedi";
import { Get, JsonController } from "routing-controllers";
import { getPool } from "./database";
import { sql } from "slonik";

export const controllerConteudo = express.Router();

controllerConteudo.get("/", async (req: Request, res: Response) => {
  const offset = req.query.offset ? Number(req.query.offset) : null;
  const limit = req.query.limit ? Number(req.query.limit) : null;
  const order = String(req.query.order);
  // console.log(order);
  let conteudos = await findConteudo(offset, limit, order);
  res.status(200).json(conteudos);
  // let conteudos;
  // if (!order || order === "desc") {
  //   conteudos = await findConteudoDesc(offset, limit);
  // }
  // if (order === "asc") {
  //   conteudos = await findConteudoAsc(offset, limit);
  // }
});

controllerConteudo.get("/search", async (req: Request, res: Response) => {
  const searchContent = req.query.search;
  const conteudos = await findConteudo();
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

// @Service()
// @JsonController("/conteudo")
// export class controllerConteudo {
//   constructor(private readonly contentService: contentServiceClass) {}

//   contentServiceVar = new contentServiceClass();

//   @Get()
//   async findConteudo() {
//     this.contentServiceVar
//       .findConteudo()
//       .then(() => {
//         console.log(this.contentServiceVar);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     // let data: any = await this.contentService.findConteudo();
//     // return data;

//     // const pool = await getPool();
//     // let conteudo = await pool.many(sql.unsafe`SELECT * FROM conteudo`);
//     // return conteudo;
//   }
// }
