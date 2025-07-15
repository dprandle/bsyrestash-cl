//import { useState } from "react";
import styles from "./signup.module.css";

async function handle_create_user(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault(); // Prevent the default form submission

  if (!event.target) {
    return;
  }

  // Gather form data
  const form_data = new FormData(event.currentTarget);
  const data = {
    first_name: form_data.get("first_name"),
    last_name: form_data.get("last_name"),
    email: form_data.get("email"),
    password: form_data.get("password"),
  };

  try {
    // Send a POST request with JSON data
    const response = await fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("User created:", result);
    } else {
      console.error("Error creating user:", response.statusText);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}

function Signup() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up</h1>
      <form className={styles.form} onSubmit={handle_create_user}>
        <input type="text" name="first_name" placeholder="First Name" className={styles.input} required />
        <input type="text" name="last_name" placeholder="Last Name" className={styles.input} required />
        <input type="email" name="email" placeholder="Email" className={styles.input} required />
        <input type="password" name="password" placeholder="Password" className={styles.input} required />
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
export default Signup;
