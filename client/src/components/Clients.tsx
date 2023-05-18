export function Clients() {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-white p-5">
        <h1 className="text-xl p-3">Clientes</h1>
        <ul>
          <li className="border-solid border-t-white border-t-2">
            <h2>Cliente #1</h2>
            <button>Editar</button>
          </li>
        </ul>
        <button>Adicionar</button>
        <button>Remover</button>
      </div>
    </>
  );
}
