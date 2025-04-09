import styles from './navbar.module.css'

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_left}>
        <ul>
          <li className={styles.navbar_item}><a href="/">Home</a></li>
        </ul>
      </div>
      <div className={styles.navbar_center}>
        <ul>
          <li className={styles.navbar_item}><a href="/products">Products</a></li>
          <li className={styles.navbar_item}><a href="/about">About Us</a></li>
          <li className={styles.navbar_item}><a href="/contact">Contact</a></li>
        </ul>
      </div>
      <div className={styles.navbar_right}>
        <ul>
          <li className={styles.navbar_sign_in}><a href="/sign-in">Sign in</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
