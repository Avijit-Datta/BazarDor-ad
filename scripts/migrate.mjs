// Creates the BetterAuth tables in PostgreSQL (db/schema.sql).
//
//   npm run db:migrate   -> strict: fails when DATABASE_URL is missing
//   npm run build        -> runs automatically via "prebuild"; skips (with a
//                           warning) when DATABASE_URL is not set, so a plain
//                           local build still works.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import pg from "pg";

// Plain `node` doesn't read .env files the way `next` does.
for (const file of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(file);
  } catch {
    /* file not present — ignore */
  }
}

const strict = process.argv.includes("--strict");
const url = process.env.DATABASE_URL;

if (!url) {
  const msg = "DATABASE_URL is not set — skipping BetterAuth table migration.";
  if (strict) {
    console.error(`✖ ${msg}`);
    process.exit(1);
  }
  console.warn(`⚠ ${msg} (sign in / sign up will not work until it is set and migrated)`);
  process.exit(0);
}

const here = path.dirname(fileURLToPath(import.meta.url));
const sql = readFileSync(path.join(here, "..", "db", "schema.sql"), "utf8");

const pool = new pg.Pool({ connectionString: url, max: 1 });

try {
  await pool.query(sql);
  console.log("✔ BetterAuth tables are ready (user, session, account, verification).");
} catch (err) {
  console.error("✖ Database migration failed:", err instanceof Error ? err.message : err);
  process.exitCode = 1;
} finally {
  await pool.end();
}
