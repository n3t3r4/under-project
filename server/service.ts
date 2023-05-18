import { getPool } from "./database";
import { sql } from "slonik";

export async function findConteudo() {
  const pool = await getPool();
  const conteudo = await pool.many(sql.unsafe`
    select * from conteudo;
    `);
  return conteudo;
}
