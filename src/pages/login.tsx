import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { server_login, useAuth, auth_user } from "../contexts/auth";
import { API_URIS, PAGE_URIS } from "../uris";

import styles from "./login.module.css";

interface login_response {
  message: string;
  user: auth_user;
}

interface err_response {
  message: string;
}


let rerendered = 0;
export function Login() {
  const [login_failed, set_login_failed] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement | null>(null);
  ilog("Rendered ", ++rerendered, " times");

  const handle_login = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const form = formRef.current!;    
    const on_fetch_completed = (resp: Response) => {
      const on_parse_json_resolved = (data: any) => {
        if (resp.ok) {
          const lresp = data as login_response;
          auth.set_user(lresp.user);
          ilog("Setting logged in user to ", lresp.user);
          navigate(PAGE_URIS.dashboard);
          form.submit();
        } else {
          const eresp = data as err_response;
          wlog(eresp.message);
          set_login_failed(eresp.message);
        }
      };
      const on_parse_json_rejected = (reason: any) => {
        elog("Failed to parse json body: ", reason);
        set_login_failed(reason);
      };
      const json_promise = resp.json();
      json_promise.then(on_parse_json_resolved, on_parse_json_rejected);
    };

    const on_fetch_failed = (reason: any) => {
      elog("Fail", reason);
      set_login_failed(reason);
    };

    const resp_promise = server_login({ username: form.username.value, pwd: form.password.value });
    resp_promise.then(on_fetch_completed, on_fetch_failed);
  };

  const login_failed_div = (
    <div className={styles.error_message}>
      <p>Sign in failed: {login_failed}</p>
    </div>
  );

  return (
    <div className={styles.login_container}>
      <h1>Sign In</h1>
      {login_failed.length !== 0 && login_failed_div}
      <form ref={formRef} action={API_URIS.dummy_form} method="POST" onSubmit={handle_login}>
        <div className={styles.input_container}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="username"
            required
          />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            required
          />
        </div>
        <button type="submit" className={styles.login_button}>
          Sign In
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
