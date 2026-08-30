import Button from "../components/Button";
import QueueTicket from "../components/Queueticket";
import StatusBadge from "../components/Statusbadge";

export default function LiveQueue({ ticket, business, onLeave, onBrowse }) {
  const total = ticket.peopleAhead + 15;
  const progress = Math.round(((total - ticket.peopleAhead) / total) * 100);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div className="flex flex-col gap-2">
          <h1 className="text-[36px] font-extrabold tracking-tight leading-tight">
            You're in the queue
          </h1>
          <p className="text-lg text-ink-2">
            {business.name} · {business.service}
          </p>
        </div>
        <StatusBadge tone="teal">Live</StatusBadge>
      </div>

      <div className="grid lg:grid-cols-[400px_1fr] gap-8 items-start">
        <QueueTicket ticket={ticket} business={business} />

        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-line p-7 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Where you are in the line</h3>
              <span className="text-sm text-ink-2 tabular-nums">
                Position {ticket.peopleAhead + 1} of {total}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="h-9 px-4 rounded-full bg-teal-soft text-teal text-sm font-bold flex items-center tabular-nums">
                {business.nowServing}
              </span>
              <div className="flex-1 flex items-center gap-1.5">
                {Array.from({ length: ticket.peopleAhead }).map((_, i) => (
                  <span key={i} className="flex-1 h-2 rounded-full bg-line" />
                ))}
              </div>
              <span className="h-9 px-4 rounded-full bg-gradient-to-r from-brand to-brand-dark text-white text-sm font-bold flex items-center tabular-nums shadow-card">
                {ticket.number}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="h-2 rounded-full bg-mist overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand to-brand-dark"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[13px] text-ink-2">
                <span>Joined {ticket.joinedAt}</span>
                <span>Expected around {ticket.expectedAt}</span>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <InfoCard
              title={`Set off in about ${Math.max(1, ticket.waitMinutes - 15)} minutes`}
              body={`You're roughly ${business.distanceKm} km away.`}
              tone="brand"
            />
            <InfoCard
              title="Alert set for 3 people ahead"
              body="We'll text you before your number is called."
              tone="mist"
            />
          </div>

          <div className="rounded-2xl border border-line p-7 flex flex-col gap-4">
            <h3 className="text-lg font-bold">Coming up</h3>
            <div className="flex items-center gap-2 flex-wrap">
              {buildUpcoming(business.nowServing, ticket.number).map((t) => (
                <span
                  key={t.label}
                  className={`h-9 px-3.5 rounded-full text-sm font-semibold tabular-nums flex items-center border ${
                    t.isYou
                      ? "bg-ink text-white border-ink"
                      : t.isServing
                      ? "bg-teal-soft text-teal border-teal-soft"
                      : "bg-canvas text-ink-2 border-line"
                  }`}
                >
                  {t.label}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Button variant="outline" onClick={onBrowse}>
              Browse other places
            </Button>
            <Button variant="danger" onClick={onLeave}>
              Leave queue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, body, tone }) {
  const tones = {
    brand: "bg-brand-soft border-brand/20",
    mist: "bg-mist border-line-soft",
  };

  return (
    <div className={`rounded-2xl border p-5 flex flex-col gap-1 ${tones[tone]}`}>
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-ink-2">{body}</p>
    </div>
  );
}

function buildUpcoming(nowServing, yourNumber) {
  const prefix = yourNumber.split("-")[0];
  const start = Number(nowServing.split("-")[1]);
  const yours = Number(yourNumber.split("-")[1]);

  const list = [];
  for (let n = start; n <= yours + 2; n++) {
    const label = `${prefix}-${String(n).padStart(3, "0")}`;
    list.push({ label, isYou: n === yours, isServing: n === start });
  }
  return list;
}