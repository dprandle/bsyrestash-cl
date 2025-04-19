import styles from "./navbar.module.css";
import { NavLink } from "react-router-dom";
import {useAuth} from "../contexts/auth";

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
  const auth = useAuth();
  const btn_txt = (auth.user !== null) ? "Sign out" : "Sign in";
  const btn_target = (auth.user !== null) ? "/logout" : "/login";
  return (
    <div className={styles.navbar_right}>
      <ul>
        <li>
          <NavLink to={btn_target} className={styles.navbar_sign_in}>
            {btn_txt}
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <NavbarLeft />
      <NavbarMid />
      <NavbarRight />
    </nav>
  );
}

export default Navbar;
