import { Routes, Route } from "react-router-dom";
import styles from "./app.module.css";
import { Navbar } from "./components/navbar";
import { Home } from "./pages/home.tsx";
import { Products } from "./pages/products.tsx";
import { About } from "./pages/about.tsx";
import { ContactUs } from "./pages/contact-us.tsx";
import { Login } from "./pages/login.tsx";
import { Signup } from "./pages/signup.tsx";
import { Dashboard } from "./pages/dashboard.tsx";
import { ProtectedRoute } from "./components/protected_route.tsx";
import { useAuth } from "./contexts/auth.tsx"


function App() {
  const { user } = useAuth();
  return (
    <div className={styles.app}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
