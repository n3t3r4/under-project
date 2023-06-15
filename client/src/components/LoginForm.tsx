import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { log } from "console";
import { setAuthtoken } from "../auth";

type emailPassword = {
  email: string;
  senha: string;
};

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setPassword] = useState("");

  async function login({ email, senha }: emailPassword) {
    const connect = await api.post("/login", { email, senha });
    return connect.data;
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex flex-col bg-slate-300 justify-center items-center m-10 rounded-lg max-w-md shadow-lg">
          <h2 className="text-white text-2xl py-5">Login</h2>
          <form className="flex flex-col rounded-lg px-5 pb-5">
            <input
              className="m-2 pl-3 rounded-lg  outline-none"
              type="email"
              value={email}
              onChange={(value) => {
                setEmail(value.target.value);
              }}
            ></input>
            <input
              className="m-2 pl-3 rounded-lg  outline-none"
              type="password"
              value={senha}
              onChange={(value) => {
                setPassword(value.target.value);
              }}
            ></input>
            <button
              className="bg-slate-50 rounded-lg mx-8 my-2 flex justify-center"
              onClick={(event) => {
                event.preventDefault();
                login({ email, senha }).then((data) => {
                  setAuthtoken(data.jwt);
                  console.log(localStorage.getItem("token"));
                });
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
