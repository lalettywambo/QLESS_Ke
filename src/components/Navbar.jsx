import Button from "./Button";

export default function Navbar({ page, user, onNavigate, onLogout }) {
  const links = [
    { id: "browse", label: "Browse" },
    { id: "dashboard", label: "My queue" },
  ];

  return (
    <header className="sticky top-0 z-20 bg-canvas border-b border-line-soft">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between gap-6">
        <button
          onClick={() => onNavigate("browse")}
          className="flex items-center gap-2 shrink-0"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="9" fill="#FF5A5F" />
            <circle cx="13" cy="13" r="6" stroke="white" strokeWidth="2.2" />
            <path d="M17 17.4L20.5 21" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <span className="text-xl font-extrabold tracking-tight">qless</span>
        </button>

        <nav className="flex items-center gap-1">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`h-10 px-4 rounded-full text-sm transition-colors ${
                page === link.id
                  ? "bg-mist font-semibold text-ink"
                  : "text-ink-2 hover:bg-mist hover:text-ink"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden sm:flex h-9 w-9 rounded-full bg-ink text-white text-sm font-bold items-center justify-center">
                {user.name.charAt(0).toUpperCase()}
              </span>
              <Button size="sm" variant="outline" onClick={onLogout}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" variant="ghost" onClick={() => onNavigate("login")}>
                Log in
              </Button>
              <Button size="sm" onClick={() => onNavigate("signup")}>
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}