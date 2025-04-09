import styles from './app.module.css'
import Navbar from './components/navbar';

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <h1>Welcome to my app!</h1>
    </div>
  );
}

export default App;
