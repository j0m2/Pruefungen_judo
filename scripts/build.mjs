import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const source = resolve(root, "src");
const output = resolve(root, "dist");

if (process.argv.includes("--clean")) {
  rmSync(output, { recursive: true, force: true });
  console.log("dist entfernt.");
  process.exit(0);
}

if (!existsSync(source)) throw new Error("src/ fehlt.");
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
cpSync(source, output, { recursive: true });
console.log("Statische Seite gebaut: dist/");
