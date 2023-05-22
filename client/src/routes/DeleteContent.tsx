import { useState } from "react";
import { InputText } from "../components/InputText";
import { api } from "../api";
import { redirect, useNavigate } from "react-router-dom";

export function DeleteContent() {
  const [isLoading, setIsLoading] = useState("");
  const [publiID, setPubliID] = useState(0);
  const redirect = useNavigate();
  return (
    <>
      <div className="flex flex-col m-10 p-10 gap-6 max-w-md bg-slate-400 shadow-xl rounded-xl">
        <InputText
          placeholder="Publi ID"
          onChange={(item: any) => {
            setPubliID(item.target.value);
          }}
        ></InputText>
        <input
          className={`bg-red-800 rounded-xl cursor-pointer ${isLoading}`}
          type="submit"
          value="deletar"
          onClick={async () => {
            setIsLoading("cursor-wait opacity-25");
            let deleteContent = await api
              .delete(`/conteudo/${publiID}`)
              .then(() => {
                setIsLoading("");
                redirect("/dashboard");
              });
            return deleteContent;
          }}
        />
      </div>
    </>
  );
}
