import path from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            "react",
            "react-dom",
            "react-router-dom",
            "react-helmet-async",
          ],

          state: ["@reduxjs/toolkit", "react-redux", "redux-state-sync"],

          tanstack: ["@tanstack/react-query"],
          axios: ["axios"],
          motion: ["framer-motion"],
          icons: ["lucide-react"],
          swiper: ["swiper"],

          radix: [
            "@radix-ui/react-avatar",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-dialog",
            "@radix-ui/react-label",
            "@radix-ui/react-navigation-menu",
            "@radix-ui/react-radio-group",
            "@radix-ui/react-select",
            "@radix-ui/react-slot",
            "@radix-ui/react-tabs",
            "@radix-ui/react-tooltip",
          ],

          utils: [
            "clsx",
            "tailwind-merge",
            "class-variance-authority",
            "chroma-js",
            "nprogress",
            "react-hot-toast",
            "vaul",
            "input-otp",
          ],
        },
      },
    },
  },
});
