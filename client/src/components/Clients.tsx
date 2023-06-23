import { Link } from "react-router-dom";
import { api, apiOop } from "../api";
import { useEffect, useState } from "react";

type clienteType = {
  id: number;
  email: string;
  senha: string;
  agencia_id: number;
};

export const clientes: clienteType[] = [];

export function Clients() {
  const [clientesList, setClientes] = useState(clientes);
  const [clienteID, setClinteID] = useState(0);

  async function getClientes() {
    const { data } = await apiOop.get("/clientes");
    setClientes(data);
  }

  useEffect(() => {
    getClientes();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center text-white p-5">
        <div className="flex flex-row items-center p-2">
          <h1 className="text-xl p-3">Clientes</h1>
        </div>
        <ul>
          {clientesList.map((item) => {
            return (
              <li
                className="border-solid border-t-white border-t-2"
                key={item.id}
              >
                <h4>Id do Cliente: {item.id}</h4>
                <h2>Email: {item.email}</h2>
              </li>
            );
          })}
        </ul>
        <div className="flex flex-row gap-2 ">
          <Link to="/new-client">
            <button className="px-2 bg-slate-700 m-6 shadow-lg">
              Adicionar
            </button>
          </Link>
          <Link to="/delete-client">
            <button className="px-2 bg-slate-700 my-6 shadow-lg">
              Remover
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
