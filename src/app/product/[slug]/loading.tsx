export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 sm:py-10">
      <div className="skeleton-shimmer h-6 w-48 rounded" />
      <div className="skeleton-shimmer h-40 w-full rounded-2xl" />
      <div className="skeleton-shimmer h-48 w-full rounded-2xl" />
    </div>
  );
}
