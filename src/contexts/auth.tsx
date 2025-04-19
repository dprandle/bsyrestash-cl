import { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuid_v4 } from "uuid";

interface auth_user {
  id: string;
  username: string;
  password: string;
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
const USE_MOCK_BACKEND = true;

export const MOCK_USERS: auth_user[] = [
  {
    id: uuid_v4(),
    username: "chauncey",
    password: "pwd123",
    first_name: "Chandler",
    last_name: "Bing",
    email: "chandler.bing@yopmail.com",
    phone: "123-456-7890",
    role: 1,
  },
  {
    id: uuid_v4(),
    username: "candylady",
    password: "pwd123",
    first_name: "Monica",
    last_name: "Geller",
    email: "monica.geller@yopmail.com",
    phone: "123-456-7890",
    role: 1,
  },
  {
    id: uuid_v4(),
    username: "howyoudoin",
    password: "pwd123",
    first_name: "Joey",
    last_name: "Tribbiani",
    email: "joey.tribbiani@yopmail.com",
    phone: "123-456-7890",
    role: 1,
  },
  {
    id: uuid_v4(),
    username: "reginaphalange",
    password: "pwd123",
    first_name: "Pheobe",
    last_name: "Buffey",
    email: "pheobe.buffey@yopmail.com",
    phone: "123-456-7890",
    role: 1,
  },
  {
    id: uuid_v4(),
    username: "redross",
    password: "pwd123",
    first_name: "Ross",
    last_name: "Geller",
    email: "ross.geller@yopmail.com",
    phone: "123-456-7890",
    role: 1,
  },
  {
    id: uuid_v4(),
    username: "bigspender",
    password: "pwd123",
    first_name: "Rachel",
    last_name: "Greene",
    email: "rachel.greene@yopmail.com",
    phone: "123-456-7890",
    role: 1,
  },
];

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
  // The exclamation tells TS to basically treat this as now not being null
  return context!;
}

export async function getUser(username: string) {
  if (USE_MOCK_BACKEND) {
    const mockUser = MOCK_USERS.filter((user) => user.username === username);
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockUser), 1000); // Simulating a network delay
    });
  } else {
    try {
      const response = await fetch("/api/users?username=" + username);
      return await response.json();
    } catch (error) {
      console.error("Error: ", error);
    }
  }
}
