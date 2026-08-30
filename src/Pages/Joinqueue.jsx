import { useState } from "react";
import Button from "../components/Button";
import StatusBadge, { waitTone } from "../components/Statusbadge";

export default function JoinQueue({ business, isLoggedIn, onConfirm, onCancel }) {
  const [people, setPeople] = useState(1); //stores the number of people joining
  const [smsAlerts, setSmsAlerts] = useState(true);

  return (
    <div className="max-w-[860px] mx-auto flex flex-col gap-8">
      <button onClick={onCancel} className="text-sm font-semibold text-ink-2 hover:text-ink self-start">
        ← Back to browse
      </button>

      <div className="flex flex-col gap-2">
        <h1 className="text-[36px] font-extrabold tracking-tight leading-tight">
          Join the queue
        </h1>
        <p className="text-lg text-ink-2">
          {business.name} · {business.service}
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
        <div className="flex flex-col gap-6">
          <Section number="1" title="How many people are joining?">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setPeople(Math.max(1, people - 1))}
                  className="w-11 h-11 rounded-full border border-line text-xl font-semibold hover:border-ink disabled:text-ink-3 disabled:border-line-soft"
                  disabled={people === 1}
                >
                  −
                </button>
                <span className="text-xl font-bold tabular-nums w-6 text-center">{people}</span>
                <button
                  onClick={() => setPeople(Math.min(5, people + 1))}
                  className="w-11 h-11 rounded-full border border-line text-xl font-semibold hover:border-ink"
                >
                  +
                </button>
              </div>
              <p className="text-sm text-ink-2 max-w-xs">
                Each person gets their own ticket, issued in sequence.
              </p>
            </div>
          </Section>

          <Section number="2" title="How should we reach you?">
            <button
              onClick={() => setSmsAlerts(!smsAlerts)}
              className="flex items-center justify-between w-full text-left"
            >
              <div>
                <p className="font-semibold">Text me when it's nearly my turn</p>
                <p className="text-sm text-ink-2">Sent when 3 people are ahead of you</p>
              </div>
              <span
                className={`w-12 h-7 rounded-full flex items-center p-1 transition-colors ${
                  smsAlerts ? "bg-ink justify-end" : "bg-line justify-start"
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-white" />
              </span>
            </button>
          </Section>

          <Section number="3" title="What happens next">
            <ul className="flex flex-col gap-2.5">
              {[
                "Your ticket number is issued straight away.",
                "You can track your position from any device.",
                "Miss your call and you keep your place for 5 minutes.",
              ].map((line) => (
                <li key={line} className="flex gap-3 text-[15px] text-ink-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" />
                  {line}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        <div className="rounded-2xl border border-line shadow-card p-6 flex flex-col gap-5 lg:sticky lg:top-28">
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">Live right now</span>
            <StatusBadge tone={waitTone(business.waitMinutes)}>
              {business.waitMinutes} min
            </StatusBadge>
          </div>

          <div className="flex flex-col gap-3 text-[15px]">
            <Row label="People waiting" value={business.peopleWaiting} />
            <Row label="Now serving" value={business.nowServing} />
            <Row label="Tickets you'll get" value={people} />
            <div className="h-px bg-line-soft" />
            <Row label="Leave home by" value="9:40 AM" bold />
          </div>

          <Button fullWidth size="lg" onClick={() => onConfirm(business.id, people)}>
            {isLoggedIn ? "Join queue" : "Continue to join"}
          </Button>

          {!isLoggedIn && (
            <p className="text-[13px] text-ink-2 text-center -mt-2">
              You'll create a quick account on the next step.
            </p>
          )}

          <Button fullWidth variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

function Section({ number, title, children }) {
  return (
    <div className="flex flex-col gap-4 pb-6 border-b border-line-soft last:border-0">
      <div className="flex items-center gap-3">
        <span className="w-7 h-7 rounded-full bg-ink text-white text-[13px] font-bold flex items-center justify-center">
          {number}
        </span>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <div className="pl-10">{children}</div>
    </div>
  );
}

function Row({ label, value, bold }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-2">{label}</span>
      <span className={`tabular-nums ${bold ? "font-bold" : "font-semibold"}`}>{value}</span>
    </div>
  );
}