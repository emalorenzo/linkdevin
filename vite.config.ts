import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "popup.html"),
        options: resolve(__dirname, "options.html"),
        content: resolve(__dirname, "content.ts"),
        background: resolve(__dirname, "background.ts"),
      },
      output: {
        entryFileNames: "static/js/[name].js",
      },
    },
  },
});
