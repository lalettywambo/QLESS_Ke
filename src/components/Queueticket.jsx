import { useState, useEffect } from "react";
import StatusBadge from "./Statusbadge";

export default function QueueTicket({ ticket, business }) {
  const [secondsAgo, setSecondsAgo] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSecondsAgo((prev) => prev + 1), 1000);
    // clearing the timer stops it running after the component is gone
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-3xl border border-line bg-canvas shadow-lift overflow-hidden">
      <div className="px-8 pt-9 pb-7 flex flex-col items-center gap-2">
        <span className="text-[13px] font-semibold uppercase tracking-widest text-ink-2">
          Your ticket
        </span>

        <div className="text-[84px] font-extrabold leading-none tracking-tighter tabular-nums">
          {ticket.number}
        </div>

        <StatusBadge tone="teal">You're in the queue</StatusBadge>
      </div>

      <div className="flex items-center gap-2 px-6 h-4 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-line shrink-0" />
        ))}
      </div>

      <div className="px-8 pt-6 pb-8 bg-mist flex">
        <Stat value={ticket.waitMinutes} label="min wait" />
        <div className="w-px bg-line-soft" />
        <Stat value={ticket.peopleAhead} label="ahead of you" />
        <div className="w-px bg-line-soft" />
        <Stat value={business.nowServing} label="now serving" />
      </div>

      <p className="py-3 text-[13px] text-ink-2 text-center border-t border-line-soft">
        Updated {secondsAgo}s ago
      </p>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="flex-1 flex flex-col items-center gap-1">
      <b className="text-[28px] font-extrabold tracking-tight tabular-nums">{value}</b>
      <span className="text-[13px] text-ink-2">{label}</span>
    </div>
  );
}