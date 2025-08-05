import { Navigate } from "react-router-dom";
import { auth_user } from "../contexts/auth";

interface Props {
  user: auth_user | null;
  children: React.ReactNode;
}

export const ProtectedRoute = ({ user, children }: Props) => {
  if (!user) {
    // If user is not authenticated go to login page
    return <Navigate to="/login" />;
  }
  return children;
};
