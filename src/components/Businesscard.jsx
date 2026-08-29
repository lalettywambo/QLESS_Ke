import StatusBadge, { waitTone } from "./StatusBadge";

const photos = {
  coral: "from-[#FFB3A7] to-[#FF7369]",
  teal: "from-[#8FD9D0] to-[#2CA79B]",
  sand: "from-[#F3DDB8] to-[#DCB878]",
  sky: "from-[#AFCDE8] to-[#6E9EC6]",
};

export default function BusinessCard({ business, onJoinQueue }) {
  const { name, service, area, distanceKm, rating, reviews, waitMinutes, isOpen, tone } =
    business;

  return (
    <button
      onClick={() => isOpen && onJoinQueue(business.id)}
      disabled={!isOpen}
      className="text-left group disabled:cursor-not-allowed"
    >
      <div
        className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${photos[tone]}
                    relative overflow-hidden ${isOpen ? "" : "grayscale opacity-60"}`}
      >
        <div className="absolute top-3 left-3">
          {isOpen ? (
            <span className="h-7 px-3 rounded-full bg-canvas text-[13px] font-semibold flex items-center shadow-card">
              {service}
            </span>
          ) : (
            <span className="h-7 px-3 rounded-full bg-ink text-white text-[13px] font-semibold flex items-center">
              Closed today
            </span>
          )}
        </div>
      </div>

      <div className="pt-3 flex flex-col gap-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-[15px] leading-snug group-hover:underline">
            {name}
          </h3>
          <span className="text-sm shrink-0">
            ★ {rating}{" "}
            <span className="text-ink-2 font-normal">({reviews})</span>
          </span>
        </div>

        <p className="text-sm text-ink-2">
          {area} · {distanceKm} km
        </p>

        <div className="pt-1.5">
          {isOpen ? (
            <StatusBadge tone={waitTone(waitMinutes)}>
              {waitMinutes} min wait
            </StatusBadge>
          ) : (
            <StatusBadge tone="neutral">Opens 8:00 AM</StatusBadge>
          )}
        </div>
      </div>
    </button>
  );
}