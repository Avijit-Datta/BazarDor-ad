import "server-only";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";

/**
 * BetterAuth server instance.
 *
 *  - Email + password and (optional) Google / GitHub social login
 *  - PostgreSQL storage (see db/schema.sql, applied by `npm run db:migrate`)
 *  - `nextCookies()` lets BetterAuth set cookies from Server Actions / RSC
 *    (it must stay the LAST plugin).
 */

// Re-use one pool across hot reloads in development.
const globalForPg = globalThis as unknown as { __bazardorPgPool?: Pool };

if (!process.env.DATABASE_URL) {
  console.warn(
    "[auth] DATABASE_URL is not set — sign in / sign up will fail until you configure it (see README)."
  );
}

const pool =
  globalForPg.__bazardorPgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
  });

if (process.env.NODE_ENV !== "production") globalForPg.__bazardorPgPool = pool;

/** Which social providers have credentials configured (used to show/hide buttons). */
export const socialProviders = {
  google: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
  github: Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
};

const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

const baseURL = process.env.BETTER_AUTH_URL ?? productionUrl;

const trustedOrigins = [
  baseURL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  process.env.VERCEL_BRANCH_URL ? `https://${process.env.VERCEL_BRANCH_URL}` : undefined,
].filter((o): o is string => Boolean(o));

export const auth = betterAuth({
  database: pool,
  baseURL,
  trustedOrigins,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    // Same flow as the original app: after sign-up the user signs in explicitly.
    autoSignIn: false,
  },
  socialProviders: {
    ...(socialProviders.google
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          },
        }
      : {}),
    ...(socialProviders.github
      ? {
          github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
          },
        }
      : {}),
  },
  plugins: [nextCookies()],
});
