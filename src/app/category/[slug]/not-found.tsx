import EmptyState from "@/components/EmptyState";

export default function CategoryNotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <EmptyState
        emoji="🔍"
        title="৪০৪ — এই ক্যাটাগরি খুঁজে পাওয়া যায়নি"
        subtitle="আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি বিদ্যমান নেই বা সরানো হয়েছে।"
      />
    </div>
  );
}
