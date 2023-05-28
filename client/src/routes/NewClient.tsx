import { useState } from "react";
import { InputText } from "../components/InputText";
import { api } from "../api";
import { redirect, useNavigate } from "react-router-dom";
import { useZorm } from "react-zorm";
import { createClientSchema } from "../contentClient.schema";

const clienteInit = {
  email: "",
  senha: "",
};

export function NewClient() {
  const [newCliente, setNewCliente] = useState(clienteInit);
  const [isLoading, setIsLoading] = useState("");

  const redirect = useNavigate();

  const zorm = useZorm("client", createClientSchema, {
    async onValidSubmit(event) {
      event.preventDefault();
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
    },
  });

  return (
    <>
      <div>
        <form
          className="flex flex-col m-10 p-10 gap-6 max-w-md bg-slate-400 shadow-xl rounded-xl"
          noValidate
          ref={zorm.ref}
        >
          <InputText
            name={zorm.fields.cliente()}
            placeholder="Email"
            onChange={(data: any) => {
              const email = data.target.value;
              setNewCliente({ ...newCliente, email });
            }}
          ></InputText>
          {zorm.errors.cliente((error) => {
            return <span>{error.message}</span>;
          })}
          <InputText
            name={zorm.fields.cliente()}
            placeholder="Senha"
            onChange={(data: any) => {
              const senha = data.target.value;
              setNewCliente({ ...newCliente, senha });
            }}
          ></InputText>
          {zorm.errors.cliente((error) => {
            return <span>{error.message}</span>;
          })}
          <button
            className={`bg-white rounded-xl cursor-pointer ${isLoading}`}
            type="submit"
            value="enviar"
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
        </form>
      </div>
    </>
  );
}
