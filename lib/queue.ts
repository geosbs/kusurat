const VIENNA = "Europe/Vienna";

export const QUEUE_SLOTS = ["08:30", "10:30", "12:30", "14:30", "16:30", "18:30", "20:30"] as const;

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function zonedLocalToUtc(year: number, month: number, day: number, hour: number, minute: number) {
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute, 0);
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: VIENNA,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  const parts = Object.fromEntries(
    formatter.formatToParts(new Date(utcGuess)).filter((part) => part.type !== "literal").map((part) => [part.type, part.value]),
  );
  const asIfUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour === "24" ? 0 : parts.hour),
    Number(parts.minute),
    Number(parts.second),
  );
  return new Date(utcGuess - (asIfUtc - utcGuess));
}

export function viennaParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: VIENNA,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const parts = Object.fromEntries(
    formatter.formatToParts(date).filter((part) => part.type !== "literal").map((part) => [part.type, part.value]),
  );
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour === "24" ? 0 : parts.hour),
    minute: Number(parts.minute),
  };
}

export function slotUtc(year: number, month: number, day: number, slot: string) {
  const [hour, minute] = slot.split(":").map(Number);
  return zonedLocalToUtc(year, month, day, hour, minute);
}

function addDays(year: number, month: number, day: number, amount: number) {
  const utc = Date.UTC(year, month - 1, day + amount);
  const next = new Date(utc);
  return { year: next.getUTCFullYear(), month: next.getUTCMonth() + 1, day: next.getUTCDate() };
}

export function nextQueueSlot(occupied: Date[], after = new Date()) {
  const occupiedKeys = new Set(occupied.map((item) => item.getTime()));
  const now = viennaParts(after);
  let cursor = { year: now.year, month: now.month, day: now.day };

  for (let dayOffset = 0; dayOffset < 400; dayOffset += 1) {
    for (const slot of QUEUE_SLOTS) {
      const candidate = slotUtc(cursor.year, cursor.month, cursor.day, slot);
      if (candidate.getTime() <= after.getTime()) continue;
      if (occupiedKeys.has(candidate.getTime())) continue;
      return candidate;
    }
    cursor = addDays(cursor.year, cursor.month, cursor.day, 1);
  }

  return new Date(after.getTime() + 24 * 60 * 60 * 1000);
}

export function formatViennaSlot(date: Date | string | null | undefined) {
  if (!date) return "—";
  const value = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(value.getTime())) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: VIENNA,
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(value);
}

export function formatPublicDate(date: Date | string | null | undefined) {
  if (!date) return "";
  const value = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(value.getTime())) return "";
  return value.toLocaleDateString("de-AT", { timeZone: VIENNA, day: "numeric", month: "long", year: "numeric" });
}
