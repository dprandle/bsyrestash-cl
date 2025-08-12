import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const BASE_PATH = env.VITE_BASE_PATH;
  return {
    base: `${BASE_PATH}`,
    build: {
      sourcemap: true,
    },
    define: {
      BASE_URI: JSON.stringify(`${BASE_PATH}`),
      API_URI: JSON.stringify(`${BASE_PATH}api/`),
    },
    plugins: [react()],
  };
});
