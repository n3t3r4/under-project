import sql, { createPool, DatabasePool } from "slonik";

let pool: DatabasePool;
export async function getPool() {
  if (pool === undefined) {
    pool = await createPool(
      "postgres://aluno:infnet123@142.93.174.194/jose_leffa"
    );
  }
  return pool;
}
