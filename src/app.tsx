import styles from './app.module.css'

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={`${styles.navbarleft} ${styles["navbar-item"]}`}>
        <a href="/">Home</a>
      </div>
      <div className={styles.navbarcenter}>
        <ul>
          <li className={styles["navbar-item"]}><a href="/products">Products</a></li>
          <li className={styles["navbar-item"]}><a href="/about">About Us</a></li>
          <li className={styles["navbar-item"]}><a href="/contact">Contact</a></li>
        </ul>
      </div>
      <div className={styles.navbarright}>
        <a href="/login">Login</a>
      </div>
    </nav>
  );
}

function App() {
  return (
    <div className={styles.scooby}>
      <Navbar />
      <h1>Welcome to my app!</h1>
    </div>
  );
}

export default App;
