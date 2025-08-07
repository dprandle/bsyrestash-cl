import styles from "./navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { server_logout, useAuth } from "../contexts/auth";

function NavbarLeft() {
  return (
    <div className={styles.navbar_left}>
      <ul>
        <li>
          <NavLink to="/" className={styles.navbar_item}>
            Home
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

function NavbarMid() {
  return (
    <div className={styles.navbar_mid}>
      <ul>
        <li>
          <NavLink to="/products" className={styles.navbar_item}>
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={styles.navbar_item}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={styles.navbar_item}>
            Contact
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

function NavbarRight() {
  const { user, set_user } = useAuth();
  const navigate = useNavigate();

  const on_click_func = () => {
    const on_logout_resolved = (_res: Response) => {
      set_user(null);
      navigate("");
    };
    const on_logout_rejected = (reason: any) => {
      wlog("Error with logging out: ", reason);
    };
    server_logout().then(on_logout_resolved, on_logout_rejected);
  };

  const login_element = (
    <NavLink to="/login" className={styles.navbar_sign_in}>
      Sign in
    </NavLink>
  );

  const logout_element = (
    <div onClick={on_click_func} className={styles.navbar_sign_in}>
      Sign out
    </div>
  );

  return (
    <div className={styles.navbar_right}>
      <ul>
        <li>{user ? logout_element : login_element}</li>
      </ul>
    </div>
  );
}

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <NavbarLeft />
      <NavbarMid />
      <NavbarRight />
    </nav>
  );
}
