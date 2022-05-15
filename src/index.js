import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "index.css";
import App from "./App";
import { makeServer } from "server";
import { AuthProvider, AllNotesProvider } from "context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <AllNotesProvider>
          <App />
        </AllNotesProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
