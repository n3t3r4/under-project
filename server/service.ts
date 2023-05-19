import { getPool } from "./database";
import { sql } from "slonik";

export async function findConteudo() {
  const pool = await getPool();
  const conteudo = await pool.many(sql.unsafe`
    select * from conteudo;
    `);
  return conteudo;
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

export async function createConteudo(conteudo: conteudoType) {
  const pool = await getPool();
  const createConteudo = await pool.many(sql.unsafe`
  INSERT INTO conteudo (titulo, conteudo_post, data_publi, status, agencia_id, cliente_id)
  VALUES (${conteudo.titulo}, ${conteudo.conteudo_post}, ${conteudo.data_publi}, ${conteudo.status}, ${conteudo.agencia_id}, ${conteudo.cliente_id});
  `);
  return createConteudo;
}
