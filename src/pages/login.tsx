import { useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchUser as fetchUser, useAuth } from "../contexts/auth";

import styles from "./login.module.css";

function Login() {
  const [username, set_username] = useState("");
  const [password, set_password] = useState("");
  const [login_failed, set_login_failed] = useState("");
  const auth = useAuth();

  const handle_login = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const user = await fetchUser(username);
      if (user) {
        // Check if the password matches
        if (user.password === password) {
          auth.login(user);
          console.log("Login successful:", user);
        } else {
          set_login_failed("password");
          console.log("Invalid password");
        }
      } else {
        set_login_failed("username");
        console.log("Invalid user");
      }
    } catch (err) {
      console.log("Error: ", err);
    }
    //auth.login(user_promise.then);
    // Handle login logic here
    console.log("Logging in with:", { username, password });
  };

  const login_failed_div = (
    <div className={styles.error_message}>
      <p>Login failed: Incorrect {login_failed}</p>
    </div>
  );

  return (
    <div className={styles.login_container}>
      <h1>Log In</h1>
      {login_failed.length !== 0 && login_failed_div}
      <form onSubmit={handle_login}>
        <div className={styles.input_container}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={username} onChange={(e) => set_username(e.target.value)} required />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => set_password(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.login_button}>
          Log In
        </button>
      </form>
      <div className={styles.create_account}>
        <p>
          Don't have an account? <NavLink to="/signup">Create an account</NavLink>
        </p>
      </div>
    </div>
  );
}
export default Login;
