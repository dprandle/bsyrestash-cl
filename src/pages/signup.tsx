import { useState } from "react";
import { server_create_user, auth_new_user, auth_credentials } from "../contexts/auth";
import styles from "./signup.module.css";

interface err_response {
  message: string;
}

function do_login(ucreds: auth_credentials) {
  
}

function try_to_create_user(udata: auth_new_user, set_create_user_failed: any) {
  const on_response_finish = (resp: Response) => {
    if (resp.ok) {
      const ucreds: auth_credentials = {
        username: udata.username,
        password: udata.password,
      };
      do_login(ucreds);
    } else {
      const err: 
      const str = "User creation failed: " + ;
      
      set_create_user_failed()
    }
  };
  const on_response_fail = (reason: any) => {
    const str = "Failed to create user: " + reason;
    wlog(str);
    set_create_user_failed(str);
  };
  const prom = server_create_user(udata);
  prom.then(on_response_finish, on_response_fail);
}

export function Signup() {
  const [create_user_failed, set_create_user_failed] = useState("");

  const handle_create_user = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission
    asrt(event.target);

    // Gather form data
    const form_data = new FormData(event.currentTarget);
    const data: auth_new_user = {
      email: form_data.get("email") as string,
      password: form_data.get("password") as string,
      username: form_data.get("username") as string,
    };
    try_to_create_user(data, set_create_user_failed);
  };

  const create_user_failed_div = (
    <div className={styles.error_message}>
      <p>Login failed: {create_user_failed}</p>
    </div>
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up</h1>
      {create_user_failed.length !== 0 && create_user_failed_div}
      <form className={styles.form} onSubmit={handle_create_user}>
        <input type="email" name="email" placeholder="Email" className={styles.input} required />
        <input type="password" name="password" placeholder="Password" className={styles.input} required />
        <input type="text" name="username" placeholder="Username" className={styles.input} required />
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
