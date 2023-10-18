import { Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const ProtectedRoute = () => {
  const user = localStorage.getItem("token");

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user) {
    try {
      const decoded = jwt_decode<{ exp: number; status: "blocked" | "active" }>(
        user
      );
      if (decoded.exp < Date.now() / 1000 || decoded.status === "blocked") {
        localStorage.removeItem("token");
        return <Navigate to="/login" state={{ isBlocked: true }} />;
      }
    } catch (error) {
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }
  }

  return <Outlet />;
};
