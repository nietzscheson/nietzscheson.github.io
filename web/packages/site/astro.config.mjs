import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://nietzscheson.github.io",
  trailingSlash: "ignore",
  integrations: [react(), sitemap()],
  vite: { plugins: [tailwindcss()] },
  markdown: {
    shikiConfig: { themes: { light: "github-light", dark: "github-dark" }, defaultColor: false },
  },
  // Old Jekyll pages now live as sections of the one-page home.
  redirects: {
    "/about": "/#about",
    "/contact": "/#contact",
    "/contacts": "/#contact",
    "/writing": "/#writing",
  },
});
