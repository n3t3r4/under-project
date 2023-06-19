import { Link, useNavigate } from "react-router-dom";
import { Board } from "../components/Board";
import { useEffect, useState } from "react";
import { Schedules } from "../components/Schedules";
import { Clients } from "../components/Clients";
import { Config } from "../components/Config";
import { currentUser } from "../components/LoginForm";

const token = localStorage.getItem("token") ?? " ";

export function Dashboard() {
  const redirect = useNavigate();
  useEffect(() => {
    if (token !== " ") {
      redirect("/");
    }
    setUserName(currentUser);
  }, []);
  const [currentBoard, setBoard] = useState(<Schedules />);
  const [userName, setUserName] = useState(currentUser);
  return (
    <>
      <div className="flex flex-row m-10 shadow-lg rounded-xl">
        <div className="bg-slate-300 flex-2 rounded-l-xl min-h-[1024px]">
          <ul className="px-3 py-10 space-y-8">
            <span className="text-sm">Logado como: {userName}</span>
            <li className="border-b-8 hover:text-white hover:shadow-xl">
              <button
                onClick={() => {
                  setBoard(<Schedules />);
                }}
              >
                Agendamentos
              </button>
            </li>

            <li className="border-b-8 hover:text-white hover:shadow-xl">
              <button
                onClick={() => {
                  setBoard(<Clients />);
                }}
              >
                Clientes
              </button>
            </li>

            <li className="border-b-8 hover:text-white hover:shadow-xl">
              <button
                onClick={() => {
                  setBoard(<Config />);
                }}
              >
                Configurações
              </button>
            </li>

            <li className="border-b-8 hover:text-white hover:shadow-xl">
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                }}
              >
                <Link to="/">Sair</Link>
              </button>
            </li>
          </ul>
        </div>
        <div className="bg-slate-400 flex-1 rounded-r-xl">
          <Board currentBoard={currentBoard} />
        </div>
      </div>
    </>
  );
}
