export function LoginForm() {
  return (
    <>
      <div className="flex flex-col bg-slate-300 justify-center items-center m-10 rounded-lg">
        <h2 className="text-white text-2xl pt-5">Login</h2>
        <form className="flex flex-col rounded-lg px-5 pb-5">
          <input
            className="m-2 pl-3 rounded-lg  outline-none"
            type="email"
          ></input>
          <input
            className="m-2 pl-3 rounded-lg  outline-none"
            type="password"
          ></input>
          <button className="bg-slate-50 rounded-lg mx-5 my-2">Login</button>
        </form>
      </div>
    </>
  );
}
