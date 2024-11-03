import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface UserGuardProps {
  children: ReactNode;
}

const UserGuard = ({ children }: UserGuardProps) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/notfound" />;
  }
  return <>{children}</>;
};

export default UserGuard;
