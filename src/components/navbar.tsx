import styles from "./navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { server_logout, useAuth } from "../contexts/auth";
import { PAGE_URIS } from "../uris";

function NavbarLeft() {
  return (
    <div className={styles.navbar_left}>
      <ul>
        <li>
          <NavLink to={PAGE_URIS.home} className={styles.navbar_item}>
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
          <NavLink to={PAGE_URIS.products} className={styles.navbar_item}>
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to={PAGE_URIS.about} className={styles.navbar_item}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to={PAGE_URIS.contact} className={styles.navbar_item}>
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
      navigate(PAGE_URIS.home);
    };
    const on_logout_rejected = (reason: any) => {
      wlog("Error with logging out: ", reason);
    };
    server_logout().then(on_logout_resolved, on_logout_rejected);
  };

  const login_element = (
    <NavLink to={PAGE_URIS.login} className={styles.navbar_sign_in}>
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
