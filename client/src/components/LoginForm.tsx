import { Link } from "react-router-dom";

export function LoginForm() {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex flex-col bg-slate-300 justify-center items-center m-10 rounded-lg max-w-md shadow-lg">
          <h2 className="text-white text-2xl py-5">Login</h2>
          <form className="flex flex-col rounded-lg px-5 pb-5">
            <input
              className="m-2 pl-3 rounded-lg  outline-none"
              type="email"
            ></input>
            <input
              className="m-2 pl-3 rounded-lg  outline-none"
              type="password"
            ></input>
            <Link
              to="/dashboard"
              className="bg-slate-50 rounded-lg mx-8 my-2 flex justify-center"
            >
              <button>Login</button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
