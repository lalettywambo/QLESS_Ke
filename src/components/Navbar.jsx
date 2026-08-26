export default function Navbar({ currentPage, onNavigate }) {
  const links = ["Dashboard", "Browse", "Bookings", "Notifications"];

  return (
    <header
      className="h-[72px] bg-white/90 border-b border-line-soft
                 flex items-center justify-between px-10"
    >
      <div className="flex items-center gap-2.5">
        <svg width="30" height="30" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="9" fill="#35624F" />
          <circle cx="13" cy="13" r="6" stroke="#D9EDE2" strokeWidth="2.2" />
          <path d="M17 17.4L20.5 21" stroke="#D9EDE2" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
        <div className="flex flex-col leading-none">
          <span className="text-[19px] font-extrabold tracking-tight">Qless</span>
          <span className="text-[9.5px] font-bold tracking-[0.14em] text-ink-3 uppercase mt-0.5">
            Kenya
          </span>
        </div>
      </div>

      <nav className="flex items-center gap-7">
        {links.map((link) => (
          <button
            key={link}
            onClick={() => onNavigate(link)}
            className={
              link === currentPage
                ? "text-sm font-bold text-sage"
                : "text-sm font-medium text-ink-2 hover:text-ink"
            }
          >
            {link}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-3.5">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M15 7.6v-.8a5 5 0 00-10 0v.8L3.6 15h12.8L15 7.6z" stroke="#5B6A63" strokeWidth="1.6" />
          <path d="M8.2 15a1.8 1.8 0 003.6 0" stroke="#5B6A63" strokeWidth="1.6" />
        </svg>
        <div
          className="w-9 h-9 rounded-full bg-sage-100 text-sage
                     flex items-center justify-center text-[13px] font-bold"
        >
          LW
        </div>
      </div>
    </header>
  );
}