import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./AuthRoutes.css";

const AuthRoutes = () => {
  return (
    <div>
      <header className="text-center auth-route-header gutter-bottom-32">
        <h1>
          <Link className="link " to="/">
            Jot Notes
          </Link>
        </h1>
      </header>
      <Outlet />
    </div>
  );
};

export default AuthRoutes;
