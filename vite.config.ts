import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [react(), viteSingleFile(), tailwindcss()],
  build: {
    target: "esnext",
    cssCodeSplit: false, // Don't split CSS into separate files
    assetsInlineLimit: 100000000, // Inline all assets (images/fonts/etc.)
    rollupOptions: {
      output: {},
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
