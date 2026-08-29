export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  onClick,
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold " +
    "border transition-all active:scale-[0.98] disabled:cursor-not-allowed " +
    "disabled:active:scale-100";

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-12 px-6 text-[15px]",
    lg: "h-14 px-7 text-base",
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-brand to-brand-dark text-white border-transparent " +
      "shadow-card hover:brightness-105",
    secondary: "bg-canvas text-ink border-ink hover:bg-mist",
    outline: "bg-canvas text-ink border-line hover:border-ink hover:bg-mist",
    ghost: "bg-transparent text-ink border-transparent hover:bg-mist",
    danger: "bg-canvas text-alert border-line hover:bg-alert-soft hover:border-alert",
    disabled: "bg-mist text-ink-3 border-line-soft",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${
        variants[disabled ? "disabled" : variant]
      } ${fullWidth ? "w-full" : ""}`}
    >
      {children}
    </button>
  );
}