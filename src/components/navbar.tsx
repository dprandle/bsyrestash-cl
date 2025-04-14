import styles from './navbar.module.css';
import {NavLink} from 'react-router-dom';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_left}>
        <ul>
          <li><NavLink to="/" className={styles.navbar_item}>Home</NavLink></li>
        </ul>
      </div>
      <div className={styles.navbar_center}>
        <ul>
          <li><NavLink to="/products" className={styles.navbar_item}>Products</NavLink></li>
          <li><NavLink to="/about" className={styles.navbar_item}>About</NavLink></li>
          <li><NavLink to="/contact" className={styles.navbar_item}>Contact</NavLink></li>
        </ul>
      </div>
      <div className={styles.navbar_right}>
        <ul>
          <li><NavLink to="/login" className={styles.navbar_sign_in}>Sign in</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
