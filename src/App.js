import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, AllNotes, Trash, Archive, Login, Signup } from "pages";
import { UserRoutes, AuthRoutes } from "components";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<UserRoutes />}>
        <Route path="/user/allnotes" element={<AllNotes />} />
        <Route path="/user/trash" element={<Trash />} />
        <Route path="/user/archive" element={<Archive />} />
      </Route>
      <Route element={<AuthRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}

export default App;
