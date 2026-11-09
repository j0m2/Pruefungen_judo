import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const source = resolve(root, "src");
const output = resolve(root, "dist");
const version = (process.env.BUILD_VERSION || "0.1.0").replace(/[^0-9A-Za-z._-]/g, "") || "0.1.0";
const builtAt = new Date();
const buildDate = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Berlin",
  timeZoneName: "short",
}).format(builtAt);

if (process.argv.includes("--clean")) {
  rmSync(output, { recursive: true, force: true });
  console.log("dist entfernt.");
  process.exit(0);
}

if (!existsSync(source)) throw new Error("src/ fehlt.");
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
cpSync(source, output, { recursive: true });

const indexPath = resolve(output, "index.html");
const index = readFileSync(indexPath, "utf8")
  .replaceAll("__BUILD_VERSION__", version)
  .replaceAll("__BUILD_DATE__", buildDate)
  .replaceAll("__BUILD_ISO__", builtAt.toISOString());
writeFileSync(indexPath, index);

console.log(`Statische Seite gebaut: dist/ (Version ${version}, ${buildDate})`);
