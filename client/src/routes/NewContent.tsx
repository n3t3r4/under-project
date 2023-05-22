import { useState } from "react";
import { InputText } from "../components/InputText";
import { api } from "../api";
import { redirect, useNavigate } from "react-router-dom";

const conteudoInit = {
  titulo: "",
  conteudo_post: "",
  data_publi: "",
};

export function NewContent() {
  const [newConteudo, setNewConteudo] = useState(conteudoInit);
  const [isLoading, setIsLoading] = useState("");
  const redirect = useNavigate();
  return (
    <>
      <div className="flex flex-col m-10 p-10 gap-6 max-w-md bg-slate-400 shadow-xl rounded-xl">
        <InputText
          placeholder="Titulo"
          onChange={(data: any) => {
            const titulo = data.target.value;
            setNewConteudo({ ...newConteudo, titulo });
          }}
        ></InputText>
        <InputText
          placeholder="Conteudo"
          onChange={(data: any) => {
            const conteudo_post = data.target.value;
            setNewConteudo({ ...newConteudo, conteudo_post });
          }}
        ></InputText>
        <InputText
          placeholder="Data"
          onChange={(data: any) => {
            const data_publi = data.target.value;
            setNewConteudo({ ...newConteudo, data_publi });
          }}
        ></InputText>
        <button
          className={`bg-white rounded-xl cursor-pointer ${isLoading}`}
          type="submit"
          value="enviar"
          onClick={async (event) => {
            setIsLoading("cursor-wait opacity-25");
            const post = await api
              .post("/conteudo", {
                ...newConteudo,
                agencia_id: 1,
                cliente_id: 1,
                status: 1,
              })
              .then(() => {
                setIsLoading("");
                redirect("/dashboard");
              });
          }}
        >
          Enviar
        </button>
      </div>
    </>
  );
}

/* let conteudoTeste: conteudoType = {
    agencia_id: 1,
    cliente_id: 1,
    titulo: "teste titulo",
    conteudo_post: "teste",
    data_publi: "2023-05-18",
    status: 1,
  }; */
