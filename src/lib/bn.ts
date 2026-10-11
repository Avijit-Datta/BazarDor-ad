// Helpers for Bengali numerals, date & currency formatting.

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** Convert any string/number containing western digits into Bengali digits. */
export function toBnDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
}

/** Format a number with thousand separators then convert to Bengali digits. */
export function formatBnNumber(value: number): string {
  const rounded = Math.round(value * 100) / 100;
  const isInt = Number.isInteger(rounded);
  const formatted = rounded.toLocaleString("en-US", {
    minimumFractionDigits: isInt ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return toBnDigits(formatted);
}

/** Format a price with "টাকা" suffix in Bengali digits, e.g. ১,৮৫০ টাকা */
export function formatBnTaka(value: number): string {
  return `${formatBnNumber(value)} টাকা`;
}

/** Format percentage change magnitude, e.g. ২.১% */
export function formatBnPercent(pct: number): string {
  const abs = Math.abs(pct);
  const str = abs % 1 === 0 ? abs.toFixed(1) : abs.toFixed(1);
  return `${toBnDigits(str)}%`;
}

const WEEKDAYS_BN = [
  "রবিবার",
  "সোমবার",
  "মঙ্গলবার",
  "বুধবার",
  "বৃহস্পতিবার",
  "শুক্রবার",
  "শনিবার",
];

const MONTHS_BN = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

/**
 * Format a JS Date into a Bangla date string like "মঙ্গলবার, ৬ অক্টোবর, ২০২৬".
 * Always uses Bangladesh time (Asia/Dhaka) so the server (usually UTC) and the
 * browser agree on "today".
 */
export function formatBnDate(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    weekday: "short",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  const weekday = WEEKDAYS_BN[WEEKDAY_INDEX[get("weekday")] ?? 0];
  const day = toBnDigits(get("day"));
  const month = MONTHS_BN[Number(get("month")) - 1];
  const year = toBnDigits(get("year"));
  return `${weekday}, ${day} ${month}, ${year}`;
}

const UNIT_LABELS: Record<string, string> = {
  kg: "প্রতি কেজি",
  কেজি: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  liter: "প্রতি লিটার",
  লিটার: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  ডজন: "প্রতি ডজন",
  piece: "প্রতি পিস",
  pcs: "প্রতি পিস",
  পিস: "প্রতি পিস",
  gram: "প্রতি গ্রাম",
  gm: "প্রতি গ্রাম",
};

/** Map a raw API unit string into a friendly Bangla unit line. */
export function unitLabel(unit: string): string {
  if (!unit) return "প্রতি একক";
  const key = unit.trim().toLowerCase();
  return UNIT_LABELS[key] ?? `প্রতি ${unit}`;
}

/** Short unit label used next to a number, e.g. "টাকা/কেজি" */
export function unitShort(unit: string): string {
  const key = (unit || "").trim().toLowerCase();
  const map: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    pcs: "পিস",
    gram: "গ্রাম",
    gm: "গ্রাম",
  };
  return map[key] ?? unit;
}
