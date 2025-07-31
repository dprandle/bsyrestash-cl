import { useState } from "react";
import { NavLink } from "react-router-dom";
import { server_login/*, useAuth*/ } from "../contexts/auth";
 
import styles from "./login.module.css";

function Login() {
  const [username, set_username] = useState("");
  const [password, set_password] = useState("");
  const [login_failed, _set_login_failed] = useState("");
  //const auth = useAuth();

  const handle_login = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const on_login_success = (resp: Response) => {
      console.log("Success", resp);
    };

    const on_login_fail = (reason: any) => {
      console.log("Fail", reason);
    };

    const resp_promise = server_login({ username, password });
    resp_promise.then(on_login_success, on_login_fail);
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
