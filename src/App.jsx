import { useState } from "react";

import Navbar from "./components/Navbar";
import Browse from "./Pages/Browse";
import JoinQueue from "./Pages/Joinqueue";
import Dashboard from "./Pages/Dashboard";
import LiveQueue from "./Pages/Livequeue";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";

import { businesses } from "./data/business";
import { getUser, clearUser } from "./lib/Auth";

export default function App() {
  const [page, setPage] = useState("browse");  // which page is currently shown
  const [user, setUser] = useState(getUser());  // the logged in user
  const [selectedId, setSelectedId] = useState(null);  //the selected business
  const [ticket, setTicket] = useState(null); // users ticket queue
  // where to send the user once they finish logging in or signing up
  const [afterAuth, setAfterAuth] = useState("browse");

  const selectedBusiness = businesses.find((b) => b.id === selectedId);
  const ticketBusiness = ticket
    ? businesses.find((b) => b.id === ticket.businessId)
    : null;

  function handleSelectBusiness(businessId) {
    setSelectedId(businessId);
    setPage("join");
  }

  function handleConfirmJoin(businessId, people) {
    // auth is only required at the very end of the flow
    if (!user) {
      setAfterAuth("join");
      setPage("signup");
      return;
    }

    const business = businesses.find((b) => b.id === businessId);

    setTicket({
      businessId,
      people,
      number: `${business.nowServing.split("-")[0]}-${String(
        Number(business.nowServing.split("-")[1]) + business.peopleWaiting
      ).padStart(3, "0")}`,
      waitMinutes: business.waitMinutes,
      peopleAhead: business.peopleWaiting,
      joinedAt: "9:12 AM",
      expectedAt: "10:07 AM",
    });

    setPage("live");
  }

  function handleAuthDone(newUser) {
    setUser(newUser);
    setPage(afterAuth);
  }

  function handleLogout() {
    clearUser();
    setUser(null);
    setTicket(null);
    setPage("browse");
  }

  function handleNavigate(next) {
    if (next === "login" || next === "signup") setAfterAuth("browse");
    setPage(next);
  }

  if (page === "signup") {
    return (
      <SignUp onDone={handleAuthDone} onGoToLogin={() => setPage("login")} />
    );
  }

  if (page === "login") {
    return (
      <Login onDone={handleAuthDone} onGoToSignUp={() => setPage("signup")} />
    );
  }

  return (
    <div className="min-h-screen bg-canvas font-sans">
      <Navbar
        page={page}
        user={user}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

      <main className="max-w-[1280px] mx-auto px-6 py-10">
        {page === "browse" && <Browse onSelect={handleSelectBusiness} />}

        {page === "join" && selectedBusiness && (
          <JoinQueue
            business={selectedBusiness}
            isLoggedIn={Boolean(user)}
            onConfirm={handleConfirmJoin}
            onCancel={() => setPage("browse")}
          />
        )}

        {page === "dashboard" && (
          <Dashboard
            user={user}
            ticket={ticket}
            business={ticketBusiness}
            onViewQueue={() => setPage("live")}
            onBrowse={() => setPage("browse")}
          />
        )}

        {page === "live" && ticket && ticketBusiness && (
          <LiveQueue
            ticket={ticket}
            business={ticketBusiness}
            onLeave={() => {
              setTicket(null);
              setPage("browse");
            }}
            onBrowse={() => setPage("browse")}
          />
        )}

        {page === "live" && !ticket && (
          <Dashboard
            user={user}
            ticket={null}
            business={null}
            onViewQueue={() => setPage("live")}
            onBrowse={() => setPage("browse")}
          />
        )}
      </main>
    </div>
  );
}