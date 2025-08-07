import { useAuth } from "../contexts/auth";
import styles from "./logout.module.css";

function Logout() {
  const auth = useAuth();
  if (auth.loading) {
    return (<div>Loading...</div>);
  }
  
  return (
    <div className={styles.logout_page}>
      <h2>Logout Page</h2>
    </div>
  );
}
export default Logout;
