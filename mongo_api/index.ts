import { model, Schema, connect } from "mongoose";
import { createExpressServer, useContainer } from "routing-controllers";
// import { Teste } from "./src/agencia/agencia.service";
import { AgenciaController } from "./src/agencia/agencia.controller";
import "reflect-metadata";
import Container from "typedi";
import * as dotenv from "dotenv";

dotenv.config();

useContainer(Container);

createExpressServer({
  controllers: [AgenciaController],
  cors: true,
}).listen(8083, async () => {
  await connect(process.env.DATABASE_URL as string)
    .then(() => {
      console.log("server running");
    })
    .catch((error) => {
      console.log(error);
    });
});
