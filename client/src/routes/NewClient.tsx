import { useState } from "react";
import { InputText } from "../components/InputText";
import { api } from "../api";
import { redirect, useNavigate } from "react-router-dom";

const clienteInit = {
  email: "",
  senha: "",
};

export function NewClient() {
  const [newCliente, setNewCliente] = useState(clienteInit);
  const [isLoading, setIsLoading] = useState("");
  const redirect = useNavigate();
  return (
    <>
      <div className="flex flex-col m-10 p-10 gap-6 max-w-md bg-slate-400 shadow-xl rounded-xl">
        <InputText
          placeholder="Email"
          onChange={(data: any) => {
            const email = data.target.value;
            setNewCliente({ ...newCliente, email });
          }}
        ></InputText>
        <InputText
          placeholder="Senha"
          onChange={(data: any) => {
            const senha = data.target.value;
            setNewCliente({ ...newCliente, senha });
          }}
        ></InputText>
        <button
          className={`bg-white rounded-xl cursor-pointer ${isLoading}`}
          type="submit"
          value="enviar"
          onClick={async (event) => {
            setIsLoading("cursor-wait opacity-25");
            const post = await api
              .post("/clientes", {
                ...newCliente,
                agencia_id: 1,
              })
              .then(() => {
                setIsLoading("");
                redirect("/dashboard");
              });
          }}
        >
          Enviar
        </button>
        <button
          className="bg-red-800 text-white rounded-xl cursor-pointer"
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
