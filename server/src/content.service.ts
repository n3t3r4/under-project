import { Service } from "typedi";
import { getPool } from "./database";
import { sql } from "slonik";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function findConteudo(
  offset: number | null = 0,
  limit: number | null = null,
  order: string = "desc"
) {
  // const response = await prisma.conteudo.findMany({

  // })

  const sqlDirection =
    order.toLowerCase() === "desc" ? sql.unsafe`desc` : sql.unsafe`asc`;

  const sqlOrderBy = sql.unsafe`order by id ${sqlDirection}`;

  // console.log(order);
  const pool = await getPool();
  let conteudo = await pool.many(sql.unsafe`
  SELECT *, count(*) OVER() AS full_count FROM conteudo
  ${sqlOrderBy}
  OFFSET ${offset}
  LIMIT  ${limit};
  `);

  return conteudo;
}

export async function createConteudo(conteudo: conteudoType) {
  // const response = await prisma.conteudo.create({
  //   data: {
  //     titulo: conteudo.titulo,
  //     conteudo_post: conteudo.conteudo_post,
  //     data_publi: conteudo.data_publi,
  //     status: conteudo.status,
  //     agencia_id: conteudo.agencia_id,
  //     cliente_id: conteudo.cliente_id,
  //   },
  // });
  // return response;

  const pool = await getPool();
  const createConteudo =
    await pool.query(sql.unsafe`INSERT INTO conteudo (titulo, conteudo_post, data_publi, status, agencia_id, cliente_id)
  VALUES (${conteudo.titulo}, ${conteudo.conteudo_post}, ${conteudo.data_publi}, ${conteudo.status}, ${conteudo.agencia_id}, ${conteudo.cliente_id});`);
  return createConteudo;
}

export async function deleteConteudo(id: number) {
  const pool = await getPool();
  const deleteConteudo = await pool.query(
    sql.unsafe`DELETE FROM conteudo WHERE id=${id};`
  );
  return deleteConteudo;
}

export async function getContentByID(id: number) {
  const pool = await getPool();
  const getContentByID = await pool.query(
    sql.unsafe`SELECT *
    FROM conteudo
    JOIN agencia ON conteudo.agencia_id = agencia.id
    WHERE conteudo.id = ${id};`
  );
  return getContentByID;
}

export async function getContentByClientID(clienteID: number) {
  const pool = await getPool();
  const getContentByClientID = await pool.query(sql.unsafe`
  SELECT *
  FROM conteudo
  JOIN cliente ON conteudo.cliente_id = cliente.id
  WHERE cliente_id = ${clienteID}
  ORDER BY conteudo.id;
  `);
  return getContentByClientID;
}

export type conteudoType = {
  id?: number;
  titulo: string;
  conteudo_post: string;
  data_publi: string;
  status: number;
  agencia_id: number;
  cliente_id: number;
};

// //OOP
// @Service()
// export class contentServiceClass {
//   async findConteudo() {
//     const pool = await getPool();
//     let conteudo = await pool.many(sql.unsafe`SELECT * FROM conteudo`);
//     return conteudo;
//   }
// }

// export async function findConteudo2() {
//   const pool = await getPool();
//   let conteudo = await pool.many(sql.unsafe`SELECT * FROM conteudo`);
//   return conteudo;
// }
