import { useState, useEffect } from "react";
import StatusBadge from "./Statusbadge";

export default function QueueTicket({
  ticketNumber = "A-024",
  waitMinutes = 27,
  peopleAhead = 6,
  nowServing = "A-018",
}) {
  const [secondsAgo, setSecondsAgo] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSecondsAgo((prev) => prev + 1), 1000);
    // clearing the timer here stops it running after the component is gone
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-surface border border-line rounded-3xl shadow-lift overflow-hidden w-full max-w-[400px]">
      <div className="px-7 pt-8 pb-6 flex flex-col items-center gap-1">
        <span className="text-[11px] font-bold tracking-[0.09em] uppercase text-ink-3">
          Your ticket
        </span>
        <div className="font-mono font-bold text-[80px] leading-none tracking-tight">
          {ticketNumber}
        </div>
        <div className="mt-2.5">
          <StatusBadge tone="ok">You're in the queue</StatusBadge>
        </div>
      </div>

      <div className="flex items-center gap-[7px] px-4 h-3.5 overflow-hidden">
        {Array.from({ length: 34 }).map((_, i) => (
          <span key={i} className="w-[5px] h-[5px] rounded-full bg-[#DCD8CB] shrink-0" />
        ))}
      </div>

      <div className="px-7 pt-5 pb-6 bg-surface-2 flex">
        <Stat value={waitMinutes} label="min wait" />
        <div className="w-px bg-line-soft" />
        <Stat value={peopleAhead} label="ahead of you" />
        <div className="w-px bg-line-soft" />
        <Stat value={nowServing} label="now serving" />
      </div>

      <p className="px-7 pb-5 -mt-1 text-xs text-ink-3 text-center">
        Updated {secondsAgo}s ago
      </p>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="flex-1 flex flex-col items-center gap-1">
      <b className="font-mono text-[26px] font-bold tracking-tight">{value}</b>
      <span className="text-xs text-ink-3">{label}</span>
    </div>
  );
}