import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/rummikub/",
  resolve: {
    alias: {
      $lib: resolve(__dirname, "src/lib"),
    },
  },
  plugins: [svelte()],
});
