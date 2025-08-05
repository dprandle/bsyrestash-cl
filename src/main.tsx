import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/auth.tsx";

// Extend our request type to have any additional members we need and create some aliases for console.log guys
declare global {
  var ilog: any;
  var dlog: any;
  var wlog: any;
  var elog: any;
  var asrt: any;
}
globalThis.ilog = console.log;
globalThis.dlog = console.debug;
globalThis.wlog = console.warn;
globalThis.elog = console.error;
globalThis.asrt = console.assert;

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
