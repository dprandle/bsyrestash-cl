import { createContext, useContext, useState, ReactNode } from "react";

interface auth_user {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: number;
}

interface auth_credentials {
  username: string;
  password: string;
}

interface auth_ctxt {
  user: auth_user | null;
  set_user: (user: auth_user | null) => void;
}

const auth_ctxt = createContext<auth_ctxt | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Context is basically a way to bundle top level variables, like these listed below, in a
  // context which can be accessed by any component by passing the context to useContext. The only thing
  // that makes the variables in the context special at all is that components that "depend" on any of the
  // variables in the context will be re-rendered if any of the variables change.
  const [user, set_user] = useState<auth_user | null>(null); // or token-based
  return <auth_ctxt.Provider value={{ user, set_user }}>{children}</auth_ctxt.Provider>;
}

export function useAuth() {
  const context = useContext(auth_ctxt);
  console.assert(context !== null, "Auth cannot be used outside of an auth provider");
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
    signal: AbortSignal.timeout(5000)
  });
  return response;
}

export async function fetchUser(username: string) {
  try {
    const response = await fetch("/api/users?username=" + username);
    return await response.json();
  } catch (error) {
    console.error("Error: ", error);
  }
}
