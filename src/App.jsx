import { useState, useEffect } from "react";
import { Routes, Route, Navigate, Outlet, useNavigate, useParams, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Browse from "./Pages/Browse";
import JoinQueue from "./Pages/Joinqueue";
import Dashboard from "./Pages/Dashboard";
import LiveQueue from "./Pages/Livequeue";
import SignIn from "./Pages/Signin";

import { businesses } from "./data/business";
import { watchUser, logOut } from "./Lib/Auth";

export default function App() {
  const [user, setUser] = useState(null);  // the logged in user
  const [checkingUser, setCheckingUser] = useState(true);  // waiting on firebase
  const [ticket, setTicket] = useState(null); // users ticket queue
  const navigate = useNavigate();

  // firebase tells us who is signed in, now and whenever that changes
  useEffect(() => {
    return watchUser((nextUser) => {
      setUser(nextUser);
      setCheckingUser(false);
    });
  }, []);

  const ticketBusiness = ticket
    ? businesses.find((b) => b.id === ticket.businessId)
    : null;

  async function handleLogout() {
    await logOut();
    setTicket(null);
    navigate("/");
  }

  if (checkingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-ink-2">Loading…</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/signin" element={<SignInRoute user={user} />} />

      <Route element={<Layout user={user} onLogout={handleLogout} />}>
        <Route path="/" element={<Browse onSelect={(id) => navigate(`/join/${id}`)} />} />

        <Route
          path="/join/:businessId"
          element={<JoinRoute user={user} onJoined={setTicket} />}
        />

        <Route
          path="/queue"
          element={
            <Dashboard
              user={user}
              ticket={ticket}
              business={ticketBusiness}
              onViewQueue={() => navigate("/live")}
              onBrowse={() => navigate("/")}
            />
          }
        />

        <Route
          path="/live"
          element={
            ticket && ticketBusiness ? (
              <LiveQueue
                ticket={ticket}
                business={ticketBusiness}
                onLeave={() => {
                  setTicket(null);
                  navigate("/");
                }}
                onBrowse={() => navigate("/")}
              />
            ) : (
              <Navigate to="/queue" replace />
            )
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function Layout({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-canvas font-sans">
      <Navbar user={user} onLogout={onLogout} />
      <main className="max-w-[1280px] mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}

function SignInRoute({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  // where the user was headed before we asked them to sign in
  const from = location.state?.from ?? "/";

  if (user) return <Navigate to={from} replace />;

  return <SignIn onDone={() => navigate(from, { replace: true })} onCancel={() => navigate("/")} />;
}

function JoinRoute({ user, onJoined }) {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const business = businesses.find((b) => b.id === Number(businessId));

  if (!business) return <NotFound />;

  function handleConfirm(id, people) {
    // auth is only required at the very end of the flow
    if (!user) {
      navigate("/signin", { state: { from: location.pathname } });
      return;
    }

    onJoined({
      businessId: id,
      people,
      number: `${business.nowServing.split("-")[0]}-${String(
        Number(business.nowServing.split("-")[1]) + business.peopleWaiting
      ).padStart(3, "0")}`,
      waitMinutes: business.waitMinutes,
      peopleAhead: business.peopleWaiting,
      joinedAt: "9:12 AM",
      expectedAt: "10:07 AM",
    });

    navigate("/live");
  }

  return (
    <JoinQueue
      business={business}
      isLoggedIn={Boolean(user)}
      onConfirm={handleConfirm}
      onCancel={() => navigate("/")}
    />
  );
}

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="py-20 text-center flex flex-col items-center gap-3">
      <h1 className="text-3xl font-extrabold tracking-tight">Page not found</h1>
      <p className="text-ink-2">That link doesn't lead anywhere.</p>
      <button
        onClick={() => navigate("/")}
        className="font-semibold text-ink underline"
      >
        Back to browsing
      </button>
    </div>
  );
}