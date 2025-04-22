import { useState } from "react";
import { fetchUser as fetchUser, useAuth } from "../contexts/auth";
import styles from "./login.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
          console.log("Invalid password");
        }
      } else {
        console.log("Invalid user");
      }
    } catch (err) {
      console.log("Error: ", err);
    }
    //auth.login(user_promise.then);
    // Handle login logic here
    console.log("Logging in with:", { username, password });
  };

  return (
    <div className={styles.login_container}>
      <h1>Log In</h1>
      <form onSubmit={handle_login}>
        <div className={styles.input_container}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.login_button}>
          Log In
        </button>
      </form>
      <div className={styles.create_account}>
        <p>
          Don't have an account? <a href="/signup">Create an account</a>
        </p>
      </div>
    </div>
  );
}
export default Login;
