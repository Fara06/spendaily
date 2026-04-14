/** @format */

export function getMissionIcon(title: string) {
  const t = title.toLowerCase();

  if (t.includes("food") || t.includes("makan")) return "🍱";
  if (t.includes("coffee")) return "☕";
  if (t.includes("walk") || t.includes("jalan")) return "🚶";
  if (t.includes("night")) return "🌙";
  if (t.includes("save")) return "💰";
  if (t.includes("budget")) return "📊";
  if (t.includes("sport") || t.includes("gym")) return "🏋️";

  return "🎯";
}
