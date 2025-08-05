import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { server_login, useAuth, auth_user } from "../contexts/auth";

import styles from "./login.module.css";

interface login_response {
  message: string;
  user: auth_user;
}

interface err_response {
  message: string;
}

export function Login() {
  const [username, set_username] = useState("");
  const [password, set_password] = useState("");
  const [login_failed, set_login_failed] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handle_login = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const on_fetch_completed = (resp: Response) => {
      const on_json_success = (data: any) => {
        if (resp.ok) {
          const lresp: login_response = data;
          auth.set_user(lresp.user);
          ilog("Setting logged in user to ", lresp.user);
          navigate("/dashboard");
        } else {
          const eresp: err_response = data;
          wlog(eresp.message);
          set_login_failed(eresp.message);
        }
      };
      const on_json_fail = (reason: any) => {
        elog("Failed to parse json body: ", reason);
        set_login_failed(reason);
      };
      const json_promise = resp.json();
      json_promise.then(on_json_success, on_json_fail);
    };

    const on_fetch_failed = (reason: any) => {
      elog("Fail", reason);
      set_login_failed(reason);
    };

    const resp_promise = server_login({ username, password });
    resp_promise.then(on_fetch_completed, on_fetch_failed);
  };

  const login_failed_div = (
    <div className={styles.error_message}>
      <p>Login failed: {login_failed}</p>
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
