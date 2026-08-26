export default function StatusBadge({ tone = "neutral", children }) {
  const tones = {
    ok: "bg-ok-bg text-ok",
    warn: "bg-warn-bg text-warn",
    danger: "bg-danger-bg text-danger",
    info: "bg-info-bg text-info",
    neutral: "bg-[#F0EEE7] text-ink-2",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full
                  text-xs font-semibold ${tones[tone]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

export function waitTone(minutes) {
  if (minutes <= 15) return "ok";
  if (minutes <= 40) return "warn";
  return "danger";
}