import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, AllNotes, Trash, Archive, Login, Signup } from "./pages";
import { UserRoutes } from "./components";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<UserRoutes />}>
        <Route index element={<AllNotes />} />
        <Route path="trash" element={<Trash />} />
        <Route path="archive" element={<Archive />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
