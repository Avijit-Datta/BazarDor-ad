interface AuthErrorLike {
  code?: string;
  message?: string;
  status?: number;
}

/** Map BetterAuth error codes to friendly Bangla messages. */
export function authErrorMessage(error: AuthErrorLike | null | undefined, fallback: string): string {
  if (!error) return fallback;
  const code = (error.code ?? "").toUpperCase();
  const message = (error.message ?? "").toLowerCase();

  if (code.includes("INVALID_EMAIL_OR_PASSWORD") || code.includes("INVALID_PASSWORD")) {
    return "ইমেইল বা পাসওয়ার্ড সঠিক নয়।";
  }
  if (code.startsWith("USER_ALREADY_EXISTS") || message.includes("already exists")) {
    return "এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট আছে।";
  }
  if (code.includes("PASSWORD_TOO_SHORT")) {
    return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
  }
  if (code.includes("INVALID_EMAIL")) {
    return "সঠিক ইমেইল ঠিকানা দিন।";
  }
  return fallback;
}
