import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from '@tailwindcss/vite' 
export default defineConfig({
  plugins: [vue(),
    tailwindcss()// <-- Tambahkan di sini
  ],
  base: "/",
  server: {
    port: 5173,
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "index.html",
      },
    },
  },
});
