import express, { Request, Response } from "express";
import cors from "cors";
import { Container } from "typedi";
import { controllerConteudo } from "./src/content.controller";
import * as dotenv from "dotenv";
import { controllerClientes } from "./src/client.controller";
import { createExpressServer, useContainer } from "routing-controllers";
import { controllerAuth } from "./src/auth.controller";
import { ClientControllerClass } from "./src/OOPclient.controller";
import "reflect-metadata";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/conteudo", controllerConteudo);
app.use("/clientes", controllerClientes);
app.use("/login", controllerAuth);

app.listen(8080, () => {
  console.log("server 8080 running");
});

useContainer(Container);
createExpressServer({
  controllers: [ClientControllerClass],
  cors: true,
}).listen(8081, () => {
  console.log("server 8081 running");
});
