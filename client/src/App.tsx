import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { Home } from "./routes/Home";
import { Dashboard } from "./routes/Dashboard";
import { AppBar } from "./components/AppBar";
import { NewContent } from "./routes/NewContent";
import { DeleteContent } from "./routes/DeleteContent";

function App() {
  return (
    <>
      <AppBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new" element={<NewContent />} />
          <Route path="/delete" element={<DeleteContent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
