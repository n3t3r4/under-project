import { Schema, model } from "mongoose";

export interface AgenciaSchema {
  email: string;
  senha: string;
}

const agenciaSchema = new Schema<AgenciaSchema>({
  email: { type: Schema.Types.String, required: true },
  senha: { type: Schema.Types.String, required: true },
});

export const AgenciaSchemaModel = model<AgenciaSchema>(
  "agencia",
  agenciaSchema
);
