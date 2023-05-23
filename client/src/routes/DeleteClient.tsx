import { useState } from "react";
import { InputText } from "../components/InputText";
import { api } from "../api";
import { redirect, useNavigate } from "react-router-dom";

export function DeleteClient() {
  const [isLoading, setIsLoading] = useState("");
  const [clientID, setClientID] = useState(0);
  const redirect = useNavigate();
  return (
    <>
      <div className="flex flex-col m-10 p-10 gap-6 max-w-md bg-slate-400 shadow-xl rounded-xl">
        <InputText
          placeholder="Cliente ID"
          onChange={(item: any) => {
            setClientID(item.target.value);
          }}
        ></InputText>
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
