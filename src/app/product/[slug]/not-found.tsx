import EmptyState from "@/components/EmptyState";

export default function ProductNotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <EmptyState
        emoji="❓"
        title="৪০৪ — পণ্যটি খুঁজে পাওয়া যায়নি"
        subtitle="এই পণ্যটি বিদ্যমান নেই বা সরিয়ে ফেলা হয়েছে।"
      />
    </div>
  );
}
