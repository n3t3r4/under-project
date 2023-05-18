import { api } from "../api";
import { useEffect, useState } from "react";

type conteudoType = {
  id: number;
  titulo: string;
  conteudo_post: string;
  data_publi: string;
  status: number;
  agencia_id: number;
  cliente_id: number;
};

const conteudos: conteudoType[] = [];

export function Schedules() {
  const [conteudo, setConteudo] = useState(conteudos);

  async function getConteudo() {
    const { data } = await api.get("/conteudo");
    setConteudo(data);
  }
  useEffect(() => {
    getConteudo();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center text-white p-5">
        <h1 className="text-xl p-3">Agendamentos</h1>
        <ul>
          {conteudo.map((item) => {
            return (
              <>
                <li
                  className="border-solid border-t-white border-t-2"
                  key={item.id}
                >
                  <h4>Post #{item.id}</h4>
                  <h2>{item.titulo}</h2>
                  <p>{item.conteudo_post}</p>
                  <span>Data {item.data_publi}</span>
                  <br />
                  <span>Status: {item.status}</span>
                </li>
              </>
            );
          })}
        </ul>
        <div className="flex flex-row gap-2 bg-slate-700">
          <button>Adicionar</button>
          <button>Remover</button>
        </div>
      </div>
    </>
  );
}
