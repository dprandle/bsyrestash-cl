import { createContext, useContext, useState, ReactNode } from "react";

export interface auth_user {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface auth_credentials {
  username: string;
  pwd: string;
}

export interface auth_ctxt {
  user: auth_user | null;
  set_user: (user: auth_user | null) => void;
  loading: boolean;
  set_loading: (loading: boolean) => void;
}

export interface auth_new_user {
  email: string;
  pwd: string;
  username: string;
}

const AuthContext = createContext<auth_ctxt | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Context is basically a way to bundle top level variables, like these listed below, in a
  // context which can be accessed by any component by passing the context to useContext. The only thing
  // that makes the variables in the context special at all is that components that "depend" on any of the
  // variables in the context will be re-rendered if any of the variables change.
  const [user, set_user] = useState<auth_user | null>(null);
  const [loading, set_loading] = useState<boolean>(true);
  const authctxt: auth_ctxt = {user: user, set_user: set_user, loading: loading, set_loading: set_loading};
  return <AuthContext value={authctxt}>{children}</AuthContext>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  asrt(context !== null, "Auth cannot be used outside of an auth provider");
  // The exclamation tells TS to basically treat this as now not being null
  return context!;
}

export function server_login(creds: auth_credentials): Promise<Response> {
  const response = fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
    signal: AbortSignal.timeout(5000),
  });
  return response;
}

export function server_logout(): Promise<Response> {
  const response = fetch("/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    signal: AbortSignal.timeout(5000),
  });
  return response;
}

export function server_get_logged_in_user(): Promise<Response> {
  const response = fetch("/api/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    signal: AbortSignal.timeout(5000),
  });
  return response;
}

export function server_create_user_and_login(new_user: auth_new_user): Promise<Response> {
  const response = fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(new_user),
    signal: AbortSignal.timeout(5000),
  });
  return response;
}
