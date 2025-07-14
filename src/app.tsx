import styles from "./app.module.css";
import Navbar from "./components/navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home.tsx";
import Products from "./pages/products.tsx";
import About from "./pages/about.tsx";
import ContactUs from "./pages/contact-us.tsx";
import Login from "./pages/login.tsx";
import SignUp from "./pages/signup.tsx";

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
