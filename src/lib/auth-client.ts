"use client";

import { createAuthClient } from "better-auth/react";

/** Browser-side BetterAuth client (same origin, so no baseURL is needed). */
export const authClient = createAuthClient();
