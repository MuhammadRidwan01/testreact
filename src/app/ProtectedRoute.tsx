import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") !== null;

  if (!isLoggedIn) {
    return <Navigate to="/" replace={true} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
