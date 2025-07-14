//import { useState } from "react";
import styles from "./signup.module.css";

function SignUp() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up</h1>
      <form className={styles.form} action="/" method="POST">
        <input type="text" name="first_name" placeholder="First Name" className={styles.input} required />
        <input type="text" name="last_name" placeholder="Last Name" className={styles.input} required />
        <input type="email" name="email" placeholder="Email" className={styles.input} required />
        <input type="password" name="password" placeholder="Password" className={styles.input} required />
        <button type="submit" className={styles.submit_button}>Create account</button>
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
export default SignUp;
