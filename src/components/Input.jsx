export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  hint,
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-ink">{label}</span>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`h-14 px-4 rounded-xl border bg-canvas text-[15px]
                    placeholder:text-ink-3 transition-colors
                    focus:outline-none focus:ring-2
                    ${
                      error
                        ? "border-alert focus:border-alert focus:ring-alert-soft"
                        : "border-line focus:border-ink focus:ring-line-soft"
                    }`}
      />

      {error && <span className="text-[13px] font-medium text-alert">{error}</span>}
      {!error && hint && <span className="text-[13px] text-ink-2">{hint}</span>}
    </label>
  );
}