import express, { Request, Response } from "express";
import cors from "cors";
import { Container } from "typedi";
import { controllerConteudo } from "./src/content.controller";
import * as dotenv from "dotenv";
import { controllerClientes } from "./src/client.controller";
import { useContainer } from "class-validator";
import { createExpressServer } from "routing-controllers";
dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use("/conteudo", controllerConteudo);
// app.use("/clientes", controllerClientes);

// app.listen(8080, () => {
//   console.log("server running");
// });

useContainer(Container);
createExpressServer({
  controllers: [controllerConteudo],
}).listen(8080, () => {
  console.log("server running");
});
