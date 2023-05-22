import { Link } from "react-router-dom";
import { api } from "../api";
import { useEffect, useState } from "react";
import Select from "react-dropdown-select";

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
  const [clienteID, setClinteID] = useState(0);

  async function getConteudo(id?: number) {
    if (id === undefined) {
      const { data } = await api.get("/conteudo");
      setConteudo(data);
    } else {
      const { data } = await api.get(`/conteudo/clientes/${id}`);
      setConteudo(data);
    }
  }
  useEffect(() => {
    if (clienteID === 0) {
      getConteudo();
    } else {
      getConteudo(clienteID);
    }
  }, [clienteID]);

  const clientsInfo = [
    {
      id: 0,
      email: "Clientes",
    },
    {
      id: 1,
      email: "1@cliente.com",
    },
    {
      id: 2,
      email: "2@cliente.com",
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-center items-center text-white p-5">
        <div className="flex flex-row items-center p-2">
          <h1 className="text-xl p-3">Agendamentos</h1>
          <Select
            options={clientsInfo}
            labelField="email"
            valueField="id"
            onChange={(value) => {
              setClinteID(value[0].id);
              console.log(clienteID);
            }}
            values={[]}
            placeholder="Cliente"
            className="text-slate-600 bg-white"
          />
        </div>
        <ul>
          {conteudo.map((item) => {
            return (
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
            );
          })}
        </ul>
        <div className="flex flex-row gap-2 ">
          <Link to="/new">
            <button className="px-2 bg-slate-700 m-6 shadow-lg">
              Adicionar
            </button>
          </Link>
          <Link to="/delete">
            <button className="px-2 bg-slate-700 my-6 shadow-lg">
              Remover
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
