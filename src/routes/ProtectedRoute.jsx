import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = Cookies.get("accessToken");

  if (!loggedIn && !token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // 👈 this allows nested routes to render
}