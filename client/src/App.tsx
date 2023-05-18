import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { Home } from "./routes/Home";
import { Dashboard } from "./routes/Dashboard";
import { AppBar } from "./components/AppBar";

function App() {
  return (
    <>
      <AppBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
