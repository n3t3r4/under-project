import { model, Schema, connect } from "mongoose";
import { Action, createExpressServer, useContainer } from "routing-controllers";
// import { Teste } from "./src/agencia/agencia.service";
import { AgenciaController } from "./src/agencia/agencia.controller";
import "reflect-metadata";
import Container from "typedi";
import * as dotenv from "dotenv";
import {
  ErrorHandler,
  authorizationChecker,
  checkingAuth,
} from "./src/agencia/agencia.repository";

dotenv.config();

useContainer(Container);

createExpressServer({
  controllers: [AgenciaController],
  defaultErrorHandler: false,
  middlewares: [ErrorHandler],
  authorizationChecker,
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
