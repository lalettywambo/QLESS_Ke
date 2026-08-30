import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const links = [
    { to: "/", label: "Browse" },
    { to: "/queue", label: "My queue" },
  ];

  return (
    <header className="sticky top-0 z-20 bg-canvas border-b border-line-soft">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="9" fill="#FF5A5F" />
            <circle cx="13" cy="13" r="6" stroke="white" strokeWidth="2.2" />
            <path d="M17 17.4L20.5 21" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <span className="text-xl font-extrabold tracking-tight">qless</span>
        </Link>

        <nav className="flex items-center gap-1">
          {links.map((link) => (   // stores the browse and queue navigation links
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                `h-10 px-4 rounded-full text-sm transition-colors flex items-center ${
                  isActive
                    ? "bg-mist font-semibold text-ink"
                    : "text-ink-2 hover:bg-mist hover:text-ink"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (  // checks whether the user is logged in
            <>
              {user.photo ? (
                <img
                  src={user.photo}
                  alt=""
                  className="hidden sm:block h-9 w-9 rounded-full object-cover"
                />
              ) : (
                <span className="hidden sm:flex h-9 w-9 rounded-full bg-ink text-white text-sm font-bold items-center justify-center">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}
              <Button size="sm" variant="outline" onClick={onLogout}>
                Log out
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={() => navigate("/signin")}>
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}