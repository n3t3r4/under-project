import { z } from "zod";

const contentSchema = z.string();

const clientSchema = z.string().min(4);

export const createClientSchema = z.object({
  cliente: clientSchema,
});
