import { useEffect, useState } from "react";
import { InputText } from "../components/InputText";
import { api } from "../api";
import { redirect, useNavigate } from "react-router-dom";
import { clientes } from "../components/Clients";
import Select from "react-dropdown-select";

export function DeleteClient() {
  const [clientesList, setClientes] = useState(clientes);
  const [isLoading, setIsLoading] = useState("");
  const [clientID, setClientID] = useState(0);
  const redirect = useNavigate();

  async function getClientes() {
    const { data } = await api.get("/clientes");
    setClientes(data);
  }

  useEffect(() => {
    getClientes();
  }, []);

  return (
    <>
      <div className="flex flex-col m-10 p-10 gap-6 max-w-md bg-slate-400 shadow-xl rounded-xl">
        <Select
          options={clientesList}
          labelField="email"
          valueField="id"
          onChange={(data: any) => {
            const cliente_id = data[0].id;
            setClientID(cliente_id);
          }}
          values={[]}
          placeholder="Cliente"
          className="text-slate-600 bg-white"
        />
        <input
          className={`bg-red-800 text-white rounded-xl cursor-pointer ${isLoading}`}
          type="submit"
          value="Deletar"
          onClick={async () => {
            setIsLoading("cursor-wait opacity-25");
            let deleteContent = await api
              .delete(`/clientes/${clientID}`)
              .then(() => {
                setIsLoading("");
                redirect("/dashboard");
              });
            return deleteContent;
          }}
        />
        <button
          className="bg-white rounded-xl cursor-pointer"
          onClick={() => {
            redirect("/dashboard");
          }}
        >
          Cancelar
        </button>
      </div>
    </>
  );
}
