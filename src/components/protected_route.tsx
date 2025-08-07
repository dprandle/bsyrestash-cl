import { Navigate, Outlet } from "react-router-dom";
import { auth_ctxt } from "../contexts/auth";

interface Props {
  auth: auth_ctxt;
}

export const ProtectedRoute = ({ auth }: Props) => {
  ilog("Protected route");
  if (auth.loading) {
    // Render a loading indicator while auth status is being checked
    return <div>Loading...</div>;
  }
  return !auth.user ? <Navigate to="/login" /> : <Outlet />;
};
