"use client";

export type SocialProvider = "google" | "github";

interface Props {
  /** Providers that have credentials configured on the server. */
  providers: { google: boolean; github: boolean };
  disabled?: boolean;
  onSelect: (provider: SocialProvider) => void;
}

/** "অথবা" divider + Google / GitHub buttons. Renders nothing when neither is configured. */
export default function SocialButtons({ providers, disabled, onSelect }: Props) {
  if (!providers.google && !providers.github) return null;

  return (
    <>
      <div className="divider text-xs text-base-content/40">অথবা</div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {providers.google && (
          <button
            type="button"
            onClick={() => onSelect("google")}
            disabled={disabled}
            className="btn btn-outline"
          >
            <svg className="h-4 w-4" viewBox="0 0 48 48" aria-hidden="true">
              <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
              />
              <path
                fill="#FF3D00"
                d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
              />
            </svg>
            Google দিয়ে চালিয়ে যান
          </button>
        )}
        {providers.github && (
          <button
            type="button"
            onClick={() => onSelect("github")}
            disabled={disabled}
            className="btn btn-outline"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.1 3.29 9.41 7.86 10.94.57.1.78-.25.78-.56v-2.17c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.8 1.19 1.83 1.19 3.09 0 4.42-2.71 5.4-5.29 5.68.42.36.78 1.07.78 2.17v3.22c0 .31.21.67.79.56A10.52 10.52 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5z" />
            </svg>
            GitHub দিয়ে চালিয়ে যান
          </button>
        )}
      </div>
    </>
  );
}
