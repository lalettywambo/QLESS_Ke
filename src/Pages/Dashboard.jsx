import Button from "../components/Button";
import StatusBadge, { waitTone } from "../components/Statusbadge";

export default function Dashboard({ user, ticket, business, onViewQueue, onBrowse }) {
  const firstName = user ? user.name.split(" ")[0] : "there";

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-[40px] font-extrabold tracking-tight leading-tight">
          Hi {firstName}
        </h1>
        <p className="text-lg text-ink-2">
          {ticket ? "Here's your queue today." : "You're not waiting anywhere right now."}
        </p>
      </div>

      {ticket ? (
        <div className="rounded-3xl border border-line shadow-card overflow-hidden grid md:grid-cols-[280px_1fr]">
          <div className="bg-gradient-to-br from-brand to-brand-dark p-8 flex flex-col items-center justify-center gap-2 text-white">
            <span className="text-[13px] font-semibold uppercase tracking-widest text-white/80">
              Your ticket
            </span>
            <span className="text-[64px] font-extrabold leading-none tracking-tighter tabular-nums">
              {ticket.number}
            </span>
          </div>

          <div className="p-8 flex flex-col gap-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">{business.name}</h3>
                <p className="text-ink-2">{business.service} · {business.area}</p>
              </div>
              <StatusBadge tone={waitTone(ticket.waitMinutes)}>
                {ticket.waitMinutes} min
              </StatusBadge>
            </div>

            <div className="flex gap-8">
              <Metric value={ticket.peopleAhead} label="people ahead" />
              <div className="w-px bg-line-soft" />
              <Metric value={business.nowServing} label="now serving" />
              <div className="w-px bg-line-soft" />
              <Metric value={ticket.expectedAt} label="expected" />
            </div>

            <Button onClick={onViewQueue}>View live queue</Button>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl bg-mist py-20 px-10 flex flex-col items-center text-center gap-4">
          <div className="text-6xl">🎟️</div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">No active ticket</h2>
            <p className="text-ink-2 max-w-sm">
              Find a hospital, bank or salon near you and take a ticket without
              leaving the house.
            </p>
          </div>
          <Button size="lg" onClick={onBrowse}>
            Browse places
          </Button>
        </div>
      )}

      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard value={ticket ? "1" : "0"} label="Active queue" />
        <StatCard value="7" label="Queues joined this month" />
        <StatCard value="3h 42m" label="Time saved" />
      </div>
    </div>
  );
}

function Metric({ value, label }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-2xl font-extrabold tracking-tight tabular-nums">{value}</span>
      <span className="text-[13px] text-ink-2">{label}</span>
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="rounded-2xl border border-line p-6 flex flex-col gap-1">
      <span className="text-3xl font-extrabold tracking-tight tabular-nums">{value}</span>
      <span className="text-sm text-ink-2">{label}</span>
    </div>
  );
}