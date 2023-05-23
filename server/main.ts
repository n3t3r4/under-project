import express, { Request, Response } from "express";
import cors from "cors";
import { controllerConteudo } from "./src/contentController";
import * as dotenv from "dotenv";
import { controllerClientes } from "./src/clientController";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/conteudo", controllerConteudo);
app.use("/clientes", controllerClientes);

app.listen(8080, () => {
  console.log("server running");
});
