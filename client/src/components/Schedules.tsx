import { Link } from "react-router-dom";
import { FcSearch } from "react-icons/fc";
import { api } from "../api";
import { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { InputText } from "./InputText";
import { clientes } from "./Clients";

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
  const [clientesList, setClientes] = useState(clientes);
  const [clienteID, setClinteID] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  const limit = 5;
  const [offset, setOffset] = useState(0);

  async function getConteudo(id?: number, search?: string) {
    if (id === undefined) {
      const { data } = await api.get(
        `/conteudo/?offset=${offset}&limit=${limit}`
      );
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
    return setConteudo(conteudos);
  }, [clienteID, offset]);

  async function getClientes() {
    const { data } = await api.get("/clientes");
    setClientes(data);
  }

  useEffect(() => {
    getClientes();
  }, []);

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
    {
      id: 6,
      email: "6@cliente.com",
    },
    {
      id: 8,
      email: "8@cliente.com",
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-center items-center text-white p-5">
        <div className="flex flex-row items-center p-2">
          <h1 className="text-xl p-3">Agendamentos</h1>
          <Select
            options={clientesList}
            labelField="email"
            valueField="id"
            onChange={(value) => {
              setClinteID(value[0].id);
            }}
            values={[]}
            placeholder="Cliente"
            className="text-slate-600 bg-white"
          />
        </div>
        <div className="my-4 text-black">
          <InputText
            onChange={(data: any) => {
              setSearchInput(data.target.value);
            }}
            placeholder="Search..."
            key={0}
          />
          <button
            className="ml-4 p-3 rounded-xl bg-slate-200"
            onClick={async () => {
              if (searchInput.length !== 0) {
                await api
                  .get(`/conteudo/search?search=${searchInput}`)
                  .then(({ data }) => {
                    setConteudo(data);
                    console.log(data);
                  });
              } else {
                getConteudo();
              }
            }}
          >
            <FcSearch />
          </button>
        </div>
        <ul className="min-h-[610px]">
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
          <button
            className="px-2 text-slate-700 bg-white m-6 shadow-lg"
            onClick={() => {
              if (offset !== 0) {
                setOffset(offset - 5);
              }
            }}
          >
            Pág Anterior
          </button>
          <span className="flex items-center justify-center mr-5">
            Página Nº {offset / limit + 1}
          </span>
          <button
            className="px-2 text-slate-700 bg-white my-6 shadow-lg"
            onClick={() => {
              if (offset <= 10) {
                setOffset(offset + 5);
              }
            }}
          >
            Próxima Pág
          </button>
        </div>
        <div className="flex flex-row gap-2 items-center justify-center border-t-4 border-solid border-white w-full">
          <Link to="/new-content">
            <button className="px-2 bg-slate-700 m-6 shadow-lg">
              Adicionar
            </button>
          </Link>
          <Link to="/delete-content">
            <button className="px-2 bg-slate-700 my-6 shadow-lg">
              Remover
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
