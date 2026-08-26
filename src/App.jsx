import { useState } from "react";

import Navbar from "./components/Navbar";
import QueueTicket from "./components/Queueticket";
import BusinessCard from "./components/Businesscard";
import Button from "./components/Button";
import StatusBadge from "./components/Statusbadge";

import { businesses } from "./data/Business";

export default function App() {
  const [page, setPage] = useState("Dashboard");
  const [joinedId, setJoinedId] = useState(null);

  const joinedBusiness = businesses.find((b) => b.id === joinedId);

  function handleJoinQueue(businessId) {
    setJoinedId(businessId);
    setPage("Dashboard");
  }

  return (
    <div className="min-h-screen bg-canvas font-sans">
      <Navbar currentPage={page} onNavigate={setPage} />

      <main className="max-w-[1280px] mx-auto px-10 py-9">
        {page === "Browse" ? (
          <BrowsePage onJoinQueue={handleJoinQueue} />
        ) : (
          <DashboardPage business={joinedBusiness} onBrowse={() => setPage("Browse")} />
        )}
      </main>
    </div>
  );
}

function DashboardPage({ business, onBrowse }) {
  if (!business) {
    return (
      <div className="bg-surface-2 border border-line-soft rounded-2xl py-16 px-10
                      flex flex-col items-center text-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">You're not in any queue</h2>
        <p className="text-[15px] text-ink-2 max-w-sm">
          Find a hospital, bank or salon near you and take a ticket without
          leaving the house.
        </p>
        <Button onClick={onBrowse}>Browse services</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[38px] font-extrabold tracking-tight leading-tight">
          Good morning, Laletty
        </h1>
        <p className="text-[15px] text-ink-2 mt-1.5">
          You're in the queue at {business.name}.
        </p>
      </div>

      <div className="flex items-start gap-6">
        <QueueTicket
          ticketNumber="A-024"
          waitMinutes={business.waitMinutes}
          peopleAhead={6}
          nowServing="A-018"
        />

        <div className="flex-1 bg-surface border border-line rounded-2xl p-7 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold tracking-tight">Where you are in the line</h3>
            <StatusBadge tone="ok">Live</StatusBadge>
          </div>

          <p className="text-[15px] text-ink-2">
            {business.service} · {business.area}
          </p>

          <div className="h-2 rounded-full bg-[#E9E6DC] overflow-hidden">
            <div className="h-full rounded-full bg-sage" style={{ width: "66%" }} />
          </div>

          <div className="flex items-center justify-between text-xs text-ink-3">
            <span>Joined 9:12 AM</span>
            <span>Expected around 10:07 AM</span>
          </div>

          <div className="flex gap-2.5">
            <Button>View live queue</Button>
            <Button variant="secondary">Notification settings</Button>
            <Button variant="danger">Leave queue</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrowsePage({ onJoinQueue }) {
  const [query, setQuery] = useState("");

  const results = businesses.filter((b) =>
    b.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[38px] font-extrabold tracking-tight leading-tight">
          Find a service
        </h1>
        <p className="text-[15px] text-ink-2 mt-1.5">
          {results.length} businesses near Nairobi with live queues.
        </p>
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search businesses or services"
        className="h-14 px-5 rounded-2xl bg-surface border border-line
                   text-[15px] placeholder:text-ink-3
                   focus:outline-none focus:border-sage focus:ring-4 focus:ring-sage-light"
      />

      <div className="flex flex-col gap-3.5">
        {results.map((business) => (
          <BusinessCard key={business.id} business={business} onJoinQueue={onJoinQueue} />
        ))}

        {results.length === 0 && (
          <div className="bg-surface-2 border border-line-soft rounded-2xl py-14 text-center">
            <p className="text-[15px] text-ink-2">
              Nothing matches “{query}”. Try a shorter search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}