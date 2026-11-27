// Copies shared assets from the repo root (still used by Jekyll) into public/.
import { cpSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("../../../../", import.meta.url);
const pub = new URL("../public/", import.meta.url);
mkdirSync(pub, { recursive: true });
cpSync(fileURLToPath(new URL("images/", root)), fileURLToPath(new URL("images/", pub)), {
  recursive: true,
  filter: (src) => !src.endsWith(".DS_Store"),
});
cpSync(fileURLToPath(new URL("favicon.ico", root)), fileURLToPath(new URL("favicon.ico", pub)));
console.log("assets synced");
