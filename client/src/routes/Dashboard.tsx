import { Link } from "react-router-dom";
import { Board } from "../components/Board";
import { useState } from "react";
import { Schedules } from "../components/Schedules";
import { Clients } from "../components/Clients";
import { Config } from "../components/Config";

export function Dashboard() {
  let [currentBoard, setBoard] = useState(<Schedules />);
  return (
    <>
      <div className="flex flex-row m-10 shadow-lg rounded-xl">
        <div className="bg-slate-300 flex-2 rounded-l-xl min-h-[1024px]">
          <ul className="p-3 space-y-8">
            <li className="border-b-8 hover:text-white">
              <button
                onClick={() => {
                  setBoard(<Schedules />);
                }}
              >
                Agendamentos
              </button>
            </li>

            <li className="border-b-8 hover:text-white">
              <button
                onClick={() => {
                  setBoard(<Clients />);
                }}
              >
                Clientes
              </button>
            </li>

            <li className="border-b-8 hover:text-white">
              <button
                onClick={() => {
                  setBoard(<Config />);
                }}
              >
                Configurações
              </button>
            </li>

            <li className="border-b-8 hover:text-white">
              <Link to="/">Sair</Link>
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
