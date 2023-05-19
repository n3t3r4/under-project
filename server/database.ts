import { createPool, DatabasePool } from "slonik";

require("dotenv").config();

let pool: DatabasePool;
export async function getPool() {
  if (pool === undefined) {
    pool = await createPool(`${process.env.DB_PATH}`);
  }
  return pool;
}
