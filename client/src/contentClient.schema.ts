import { z } from "zod";

const contentSchema = z.string().min(1);
const dateSchema = z
  .string()
  .regex(
    new RegExp("((?:19|20)\\d\\d)/(0?[1-9]|1[012])/([12][0-9]|3[01]|0?[1-9])"),
    "Date Format = YYYY/MM/DD"
  );

const clientSchema = z.string().min(4);

export const createContentSchema = z.object({
  content: contentSchema,
  date: dateSchema,
});

export const createClientSchema = z.object({
  cliente: clientSchema,
});
