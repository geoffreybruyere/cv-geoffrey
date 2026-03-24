// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// https://astro.build/config
export default defineConfig({
  output: "static",
  vite: {
    plugins: [tailwindcss()],
    server: {
      fs: {
        // Allow Vite to serve node_modules from the parent repo (worktree support)
        allow: [path.resolve(import.meta.dirname, "../../../")],
      },
    },
  },
});
