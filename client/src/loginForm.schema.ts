import { z } from "zod";

const email = z.string().email("Insira um email válido");
const emailPassword = z.string();

export const loginFormSchema = z.object({
  email: email,
  emailPassword: emailPassword,
});
