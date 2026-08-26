import Button from "./Button";
import StatusBadge, { waitTone } from "./Statusbadge";

export default function BusinessCard({ business, onJoinQueue }) {
  const { name, service, area, distanceKm, rating, waitMinutes, isOpen } = business;

  return (
    <div className="bg-surface border border-line rounded-2xl p-5 flex gap-4 shadow-soft">
      <div className="w-[88px] h-[88px] rounded-xl bg-gradient-to-br from-sage-100 to-[#B9CFC2] shrink-0" />

      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold tracking-tight">{name}</h3>
          {isOpen ? (
            <StatusBadge tone={waitTone(waitMinutes)}>~{waitMinutes} min wait</StatusBadge>
          ) : (
            <StatusBadge tone="neutral">Closed today</StatusBadge>
          )}
        </div>

        <p className="text-[13px] text-ink-2">
          {service} · {area} · {distanceKm} km away
        </p>

        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-ink-3">
            ★ {rating} · {isOpen ? "Open now" : "Opens 8:00 AM"}
          </span>

          <div className="flex items-center gap-2.5">
            <Button variant="secondary">Book appointment</Button>
            <Button disabled={!isOpen} onClick={() => onJoinQueue(business.id)}>
              Join queue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}