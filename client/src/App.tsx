import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { Home } from "./routes/Home";
import { Dashboard } from "./routes/Dashboard";
import { AppBar } from "./components/AppBar";
import { NewContent } from "./routes/NewContent";
import { DeleteContent } from "./routes/DeleteContent";
import { NewClient } from "./routes/NewClient";
import { DeleteClient } from "./routes/DeleteClient";

function App() {
  return (
    <>
      <AppBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-content" element={<NewContent />} />
          <Route path="/delete-content" element={<DeleteContent />} />
          <Route path="/new-client" element={<NewClient />} />
          <Route path="/delete-client" element={<DeleteClient />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
