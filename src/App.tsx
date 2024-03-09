import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Chat } from "./components/chat";
import { Login } from "./components/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/chat'
          element={<Chat />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
