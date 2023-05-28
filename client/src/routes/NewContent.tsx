import { useEffect, useState } from "react";
import { InputText } from "../components/InputText";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import { useZorm } from "react-zorm";
import { createContentSchema } from "../contentClient.schema";
import { clientes } from "../components/Clients";
import Select from "react-dropdown-select";

const conteudoInit = {
  titulo: "",
  conteudo_post: "",
  data_publi: "",
  cliente_id: 0,
};

export function NewContent() {
  const [clientesList, setClientes] = useState(clientes);
  const [clientID, setClientID] = useState(0);
  const [newConteudo, setNewConteudo] = useState(conteudoInit);
  const [isLoading, setIsLoading] = useState("");
  const redirect = useNavigate();

  const zorm = useZorm("Content", createContentSchema, {
    async onValidSubmit(event) {
      event.preventDefault();
      setIsLoading("cursor-wait opacity-25");
      const post = await api
        .post("/conteudo", {
          ...newConteudo,
          agencia_id: 1,
          status: 1,
        })
        .then(() => {
          setIsLoading("");
          redirect("/dashboard");
        });
    },
  });

  async function getClientes() {
    const { data } = await api.get("/clientes");
    setClientes(data);
  }

  useEffect(() => {
    getClientes();
  }, []);
  return (
    <>
      <div>
        <form
          className="flex flex-col m-10 p-10 gap-6 max-w-md bg-slate-400 shadow-xl rounded-xl"
          noValidate
          ref={zorm.ref}
        >
          <InputText
            name={zorm.fields.content()}
            placeholder="Titulo"
            onChange={(data: any) => {
              const titulo = data.target.value;
              setNewConteudo({ ...newConteudo, titulo });
            }}
          ></InputText>
          {zorm.errors.content((error) => {
            return <span>{error.message}</span>;
          })}
          <InputText
            name={zorm.fields.content()}
            placeholder="Conteudo"
            onChange={(data: any) => {
              const conteudo_post = data.target.value;
              setNewConteudo({ ...newConteudo, conteudo_post });
            }}
          ></InputText>
          {zorm.errors.content((error) => {
            return <span>{error.message}</span>;
          })}
          <InputText
            name={zorm.fields.date()}
            placeholder="YYYY/MM/DD"
            onChange={(data: any) => {
              const data_publi = data.target.value;
              setNewConteudo({ ...newConteudo, data_publi });
            }}
          ></InputText>
          {zorm.errors.date((error) => {
            return <span>{error.message}</span>;
          })}
          <Select
            options={clientesList}
            labelField="email"
            valueField="id"
            onChange={(data: any) => {
              const cliente_id = data[0].id;
              setNewConteudo({ ...newConteudo, cliente_id });
            }}
            values={[]}
            placeholder="Cliente"
            className="text-slate-600 bg-white"
          />
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
