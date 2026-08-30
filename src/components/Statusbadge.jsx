//tone- determines the badge's color/style
//children- the text displayed inside the badge
//neutral- default tone if none is provided


export default function StatusBadge({ tone = "neutral", children }) {
  const tones = {
    ok: "bg-ok-soft text-ok",
    teal: "bg-teal-soft text-teal",
    warn: "bg-warn-soft text-warn",
    alert: "bg-alert-soft text-alert",
    brand: "bg-brand-soft text-brand-dark",
    neutral: "bg-mist text-ink-2",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 h-7 px-3 rounded-full
                  text-[13px] font-semibold whitespace-nowrap ${tones[tone]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

export function waitTone(minutes) {
  if (minutes <= 15) return "teal";
  if (minutes <= 35) return "warn";
  return "alert";
}