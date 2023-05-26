import express, { Request, Response } from "express";
import { createCliente, deleteCliente, findClientes } from "./client.service";

export const controllerClientes = express.Router();

controllerClientes.get("/", async (req: Request, res: Response) => {
  const conteudos = await findClientes();
  res.status(200).json(conteudos);
});

controllerClientes.post("/", async (req: Request, res: Response) => {
  const newCliente = req.body;
  const createClients = await createCliente(newCliente);
  res.status(200).json({ success: true });
});

controllerClientes.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleteClientes = await deleteCliente(id);
  res.status(200).json({ sucess: true });
});
/*
controllerClientes.get("/clientes/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const contentByClientID = await getContentByClientID(id);
  res.status(200).json(contentByClientID.rows);
});
 */
