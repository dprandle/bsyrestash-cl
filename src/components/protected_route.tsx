import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";

interface Props {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const { user } = useAuth();
  if (!user) {
    // If user is not authenticated go to login page
    return <Navigate to="/login" />;
  }
  return children;
};
