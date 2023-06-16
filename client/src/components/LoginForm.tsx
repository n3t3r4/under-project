import { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import { api } from "../api";
import { log } from "console";
import { setAuthtoken } from "../auth";

type emailPassword = {
  email: string;
  senha: string;
};

const token = localStorage.getItem("token") ?? " ";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setPassword] = useState("");

  async function login({ email, senha }: emailPassword) {
    const connect = await api.post("/login", { email, senha });
    return connect.data;
  }

  // async function checkLogin(token: string) {
  //   const connect = await api.get("/login", {
  //     headers: { Authorization: token },
  //   });
  //   console.log(connect.data.data.email);
  //   console.log(connect.data.data.senha);
  // }

  // useEffect(() => {
  //   const check = checkLogin(token);
  //   if (check === null) {
  //     localStorage.removeItem("token");
  //     return alert("faça o login novamente");
  //   } else {
  //     redirect("/dashboard");
  //   }
  // }, []);

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
