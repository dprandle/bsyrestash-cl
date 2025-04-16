import { createContext, useContext, useState, ReactNode } from "react";

interface auth_user {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: number;
}

interface auth_ctxt {
  user: auth_user | null;
  login: (user: auth_user) => void;
  logout: () => void;
}

const auth_ctxt = createContext<auth_ctxt | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Context is basically a way to bundle top level variables, like these listed below, in a
  // context which can be accessed by any component by passing the context to useContext. The only thing
  // that makes the variables in the context special at all is that components that "depend" on any of the
  // variables in the context will be re-rendered if any of the variables change.
  const [user, setUser] = useState<auth_user | null>(null); // or token-based
  const login = (user: auth_user) => setUser(user);
  const logout = () => setUser(null);
  return <auth_ctxt.Provider value={{ user, login, logout }}>{children}</auth_ctxt.Provider>;
}

export function useAuth() {
  const context = useContext(auth_ctxt);
  console.assert(context !== null, "Auth cannot be used outside of an auth provider");
  return context;
}
