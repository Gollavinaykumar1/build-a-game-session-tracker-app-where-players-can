import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/build-a-game-session-tracker-app-where-players-can/",
  build: { outDir: "dist", assetsDir: "assets" },
  server: { port: 3000 },
});
