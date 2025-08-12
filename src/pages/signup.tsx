import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { server_create_user_and_login, auth_new_user, auth_user, auth_ctxt, useAuth } from "../contexts/auth";
import { PAGE_URIS } from "../uris";
import styles from "./signup.module.css";

interface err_response {
  message: string;
}

interface create_user_and_login_resp {
  message: string;
  user: auth_user;
}

function try_to_create_user(udata: auth_new_user, set_create_user_failed: any, auth: auth_ctxt, nav: NavigateFunction) {
  const on_create_user_resolve = (resp: Response) => {
    const on_parse_json_resolved = (jsdata: any) => {
      if (resp.ok) {
        const parsed_resp = jsdata as create_user_and_login_resp;
        ilog("Server responded: ", parsed_resp.message);
        auth.set_user(parsed_resp.user);
        set_create_user_failed("");
        nav(PAGE_URIS.dashboard);
      } else {
        const parsed_resp = jsdata as err_response;
        wlog("Login failed: ", parsed_resp.message);
        set_create_user_failed(parsed_resp.message);
      }
    };
    const on_parse_json_rejected = (reason: any) => {
      let str = "";
      if ("message" in reason && typeof reason.message === "string") {
        str = "Parsing json failed: " + reason.message;
      } else if (typeof reason === "string") {
        str = "Parsing json failed: " + reason;
      }
      wlog(str);
      set_create_user_failed(str);
    };
    const json_promise = resp.json();
    json_promise.then(on_parse_json_resolved, on_parse_json_rejected);
  };
  const on_create_user_reject = (reason: any) => {
    let str = "";
    if ("message" in reason && typeof reason.message === "string") {
      str = "Failed to create user: " + reason.message;
    } else if (typeof reason === "string") {
      str = "Failed to create user: " + reason;
    }
    wlog(str);
    set_create_user_failed(str);
  };
  const prom = server_create_user_and_login(udata);
  prom.then(on_create_user_resolve, on_create_user_reject);
}

export function Signup() {
  const [create_user_failed, set_create_user_failed] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handle_create_user = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission
    asrt(event.target);

    // Gather form data
    const form_data = new FormData(event.currentTarget);
    const data: auth_new_user = {
      email: form_data.get("email") as string,
      pwd: form_data.get("password") as string,
      username: form_data.get("username") as string,
    };
    try_to_create_user(data, set_create_user_failed, auth, navigate);
  };

  const create_user_failed_div = (
    <div className={styles.error_message}>
      <p>{create_user_failed}</p>
    </div>
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up</h1>
      {create_user_failed.length !== 0 && create_user_failed_div}
      <form className={styles.form} onSubmit={handle_create_user}>
        <input type="email" name="email" placeholder="Email" autoComplete="email" className={styles.input} required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="new-password"
          className={styles.input}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          autoComplete="username"
          className={styles.input}
          required
        />
        <button type="submit" className={styles.submit_button}>
          Create account
        </button>
      </form>
      <div className={styles.separator}>or continue with</div>
      <div className={styles.social_buttons}>
        <button className={styles.google_button}>Google</button>
        <button className={styles.facebook_button}>Facebook</button>
        <button className={styles.apple_button}>Apple</button>
      </div>
    </div>
  );
}
