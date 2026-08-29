import StatusBadge, { waitTone } from "./Statusbadge";

const photos = {
  coral: "from-[#FFB3A7] to-[#FF7369]",
  teal: "from-[#8FD9D0] to-[#2CA79B]",
  sand: "from-[#F3DDB8] to-[#DCB878]",
  sky: "from-[#AFCDE8] to-[#6E9EC6]",
};

export default function BusinessCard({ business, onSelect }) {
  const { name, service, area, distanceKm, rating, reviews, waitMinutes, isOpen, tone } =
    business;

  return (
    <button
      onClick={() => isOpen && onSelect(business.id)}
      disabled={!isOpen}
      className="text-left group disabled:cursor-not-allowed"
    >
      <div
        className={`h-32 rounded-xl bg-gradient-to-br ${photos[tone]}
                    relative overflow-hidden ${isOpen ? "" : "grayscale opacity-60"}`}
      >
        <div className="absolute top-2 left-2">
          {isOpen ? (
            <span className="h-6 px-2.5 rounded-full bg-canvas text-xs font-semibold flex items-center shadow-card">
              {service}
            </span>
          ) : (
            <span className="h-6 px-2.5 rounded-full bg-ink text-white text-xs font-semibold flex items-center">
              Closed today
            </span>
          )}
        </div>
      </div>

      <div className="pt-2.5 flex flex-col gap-0.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm leading-snug group-hover:underline">
            {name}
          </h3>
          <span className="text-xs shrink-0">
            ★ {rating} <span className="text-ink-2 font-normal">({reviews})</span>
          </span>
        </div>

        <p className="text-xs text-ink-2">
          {area} · {distanceKm} km
        </p>

        <div className="pt-1.5">
          {isOpen ? (
            <StatusBadge tone={waitTone(waitMinutes)}>{waitMinutes} min wait</StatusBadge>
          ) : (
            <StatusBadge tone="neutral">Opens 8:00 AM</StatusBadge>
          )}
        </div>
      </div>
    </button>
  );
}
