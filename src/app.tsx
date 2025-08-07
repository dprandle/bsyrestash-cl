import { Routes, Route } from "react-router-dom";
import styles from "./app.module.css";

import { Home } from "./pages/home.tsx";
import { Products } from "./pages/products.tsx";
import { About } from "./pages/about.tsx";
import { ContactUs } from "./pages/contact-us.tsx";
import { Login } from "./pages/login.tsx";
import { Signup } from "./pages/signup.tsx";
import { Dashboard } from "./pages/dashboard.tsx";
import { ProtectedRoute } from "./components/protected_route.tsx";
import { auth_user, server_get_logged_in_user, useAuth } from "./contexts/auth.tsx";
import { useEffect } from "react";

function App() {
  const auth = useAuth();

  const use_effect_func = () => {
    if (!auth.user) {
      const on_get_logged_in_resolved = (response: Response) => {
        // We only need to parse and set the user if the response is ok - otherwise we already know what the error message response is
        if (response.ok) {
          const on_json_parsed_resolved = (user_data: any) => {
            const usr = user_data as auth_user;
            auth.set_user(usr);
            auth.set_loading(false);
            ilog("Got logged in user: ", usr.email);
          };
          const on_json_parsed_rejected = (reason: any) => {
            wlog("Failed to parse server response: ", reason);
            auth.set_loading(false);
          };
          const parse_js_prom = response.json();
          parse_js_prom.then(on_json_parsed_resolved, on_json_parsed_rejected);
        } else {
          ilog("No currently logged in user");
          auth.set_loading(false);
        }
      };
      const on_get_logged_in_rejected = (reason: any) => {
        wlog("Get logged in user rejected: ", reason);
        auth.set_loading(false);
      };
      const get_logged_in_prom = server_get_logged_in_user();
      get_logged_in_prom.then(on_get_logged_in_resolved, on_get_logged_in_rejected);
    } else {
      ilog(`${auth.user.email} already logged in`);
      auth.set_loading(false);
    }
  };
  useEffect(use_effect_func, []);

  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute auth={auth} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
