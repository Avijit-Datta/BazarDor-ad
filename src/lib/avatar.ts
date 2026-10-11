/** Generated initials avatar, used when the user has no profile picture. */
export function avatarFor(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=15803d&color=fff&bold=true&size=128`;
}

/** True when the image is one of our generated avatars (safe to regenerate). */
export function isGeneratedAvatar(url: string | null | undefined): boolean {
  return !url || url.startsWith("https://ui-avatars.com/");
}
