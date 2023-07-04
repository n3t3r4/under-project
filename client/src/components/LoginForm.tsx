import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, apiMongoDB } from "../api";
import { setAuthtoken, verifyToken } from "../auth";
import { useZorm } from "react-zorm";
import { loginFormSchema } from "../loginForm.schema";

type emailPassword = {
  email: string;
  senha: string;
};

export let currentUser: string;
const token = localStorage.getItem("token") ?? " ";

export function LoginForm() {
  const redirect = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setPassword] = useState("");

  useEffect(() => {
    if (token !== " ") {
      const connect = apiMongoDB.get("/login").then((data) => {
        console.log(data);

        if (data.data !== null) {
          currentUser = data.data.data.email;
          console.log(currentUser);
          redirect("/dashboard");
        }
        return;
      });
    }
  }, []);

  async function login({ email, senha }: emailPassword) {
    const connect = await apiMongoDB.post("/login", { email, senha });
    console.log(connect.data);

    return connect.data;
  }

  const zorm = useZorm("login", loginFormSchema, {
    async onValidSubmit(event) {
      event.preventDefault();
      await login({ email, senha }).then((data) => {
        if (data.jwt !== null) {
          alert("login realizado com sucesso");
          setAuthtoken(data.jwt);
          redirect("/dashboard");
        } else {
          alert("email/senha inválidos");
        }
      });
    },
  });

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex flex-col bg-slate-300 justify-center items-center m-10 rounded-lg max-w-md shadow-lg">
          <h2 className="text-white text-2xl py-5">Login</h2>
          <form
            className="flex flex-col rounded-lg px-5 pb-5"
            noValidate
            ref={zorm.ref}
          >
            <input
              name={zorm.fields.email()}
              placeholder="email"
              className="m-2 pl-3 rounded-lg  outline-none"
              type="email"
              value={email}
              onChange={(value) => {
                setEmail(value.target.value);
              }}
            ></input>
            {zorm.errors.email((error) => {
              return <span className="px-3 text-sm">{error.message}</span>;
            })}
            <input
              name={zorm.fields.emailPassword()}
              placeholder="senha"
              className="m-2 pl-3 rounded-lg  outline-none"
              type="password"
              value={senha}
              onChange={(value) => {
                setPassword(value.target.value);
              }}
            ></input>
            {zorm.errors.emailPassword((error) => {
              return <span>{error.message}</span>;
            })}
            <button
              className="bg-slate-50 rounded-lg mx-8 my-2 flex justify-center"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      {/* TableLogin */}
      <br />
      <br />
      <div className="flex items-center justify-center">
        <table className="bg-white border-separate shadow-2xl">
          <h4 className="text-4xl p-8">Logins válidos</h4>
          <tr>
            <th className="bg-blue-100 border text-left px-8 py-4">email</th>
            <th className="bg-blue-100 border text-left px-8 py-4">senha</th>
          </tr>
          <tr>
            <td className="border px-8 py-4">1@agencia.com</td>
            <td className="border px-8 py-4">senha</td>
          </tr>
          <tr>
            <td className="border px-8 py-4">2@agencia.com</td>
            <td className="border px-8 py-4">senha</td>
          </tr>
        </table>
      </div>
    </>
  );
}
