import { getPool } from "./database";
import { sql } from "slonik";

export async function findClientes() {
  const pool = await getPool();
  const clientes = await pool.many(sql.unsafe`
      select * from cliente where agencia_id=1 order by id desc;
    `);
  return clientes;
}

export type clienteType = {
  email: string;
  senha: string;
  agencia_id: number;
};

export async function createCliente(conteudo: clienteType) {
  const pool = await getPool();
  const createCliente =
    await pool.query(sql.unsafe`INSERT INTO cliente (email, senha, agencia_id)
  VALUES (${conteudo.email}, ${conteudo.senha}, ${conteudo.agencia_id});`);
  return createCliente;
}

export async function deleteCliente(id: number) {
  const pool = await getPool();
  const deleteCliente = await pool.query(
    sql.unsafe`DELETE FROM cliente WHERE id=${id};`
  );
  return deleteCliente;
}
