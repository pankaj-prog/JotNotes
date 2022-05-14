import React from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "context";

const UserRoutes = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default UserRoutes;
