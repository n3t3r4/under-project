import { Service } from "typedi";
import { AgenciaSchemaModel } from "./agencia.model";
import { AgenciaRepository } from "./agencia.repository";

// export function Teste() {
//   // const primeiraAgencia = new AgenciaSchemaModel({
//   //   email: "1@agencia.com",
//   //   senha: "senha",
//   // });
//   // const segundaAgencia = new AgenciaSchemaModel({
//   //   email: "2@agencia.com",
//   //   senha: "senha",
//   // });
//   // const terceiraAgencia = new AgenciaSchemaModel({
//   //   email: "3@agencia.com",
//   //   senha: "senha",
//   // });

//   // primeiraAgencia.save();
//   // segundaAgencia.save();
//   // terceiraAgencia.save();

//   const teste = AgenciaSchemaModel.find()
//     .lean()
//     .then((data) => {
//       console.log(data);
//     });
// }

@Service()
export class AgenciaService {
  constructor(private readonly agenciaRepository: AgenciaRepository) {}

  async findAgencias(email: string, senha: string) {
    const agencia = await this.agenciaRepository.findAgencias(email, senha);
    return agencia;
  }

  async checkAgencia(token: string) {
    const checking = await this.agenciaRepository.checkAgencia(token);
    return checking;
  }
}
