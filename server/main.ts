import express, { Request, Response } from "express";
import cors from "cors";
import { sql } from "slonik";
import { controllerConteudo } from "./controller";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/conteudo", controllerConteudo);

app.listen(8080, () => {
  console.log("server running");
});
