export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  disabled = false,
  onClick,
}) {
  const base =
    "inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl " +
    "text-sm font-semibold border transition-colors disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-sage text-white border-transparent hover:bg-sage-dark",
    secondary: "bg-surface text-ink border-line hover:bg-surface-2",
    quiet: "bg-sage-light text-sage border-transparent hover:bg-sage-100",
    danger: "bg-danger-bg text-danger border-transparent hover:bg-[#F0D9D6]",
    disabled: "bg-[#F2F0EA] text-ink-3 border-line-soft",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[disabled ? "disabled" : variant]} ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {children}
    </button>
  );
}