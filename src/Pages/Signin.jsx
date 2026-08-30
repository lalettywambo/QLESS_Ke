import { useState } from "react";
import { signInWithGoogle } from "../Lib/Auth";

export default function SignIn({ onDone, onCancel }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleGoogle() {
    setBusy(true);
    setError("");

    const result = await signInWithGoogle();

    setBusy(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    onDone(result.user);
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-brand to-brand-dark p-14 flex-col justify-between">
        <div className="flex items-center gap-2">
          <svg width="34" height="34" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="9" fill="white" />
            <circle cx="13" cy="13" r="6" stroke="#FF5A5F" strokeWidth="2.2" />
            <path d="M17 17.4L20.5 21" stroke="#FF5A5F" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <span className="text-2xl font-extrabold text-white">qless</span>
        </div>

        <div className="flex flex-col gap-5">
          <h2 className="text-[44px] font-extrabold leading-[1.1] tracking-tight text-white">
            Your time is worth
            <br />
            more than a bench.
          </h2>
          <p className="text-lg text-white/80 max-w-md">
            Take a ticket before you leave the house. Track your place in line.
            Arrive when it's nearly your turn.
          </p>
        </div>

        <p className="text-sm text-white/70">Free for everyone joining a queue.</p>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-14">
        <div className="w-full max-w-[420px] flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-[32px] font-extrabold tracking-tight">
              Sign in to continue
            </h1>
            <p className="text-ink-2">
              We only need this to hold your place in the queue.
            </p>
          </div>

          <button
            onClick={handleGoogle}
            disabled={busy}
            className="h-14 rounded-xl border border-line bg-canvas flex items-center
                       justify-center gap-3 font-semibold text-[15px]
                       hover:bg-mist hover:border-ink transition-colors
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <svg width="20" height="20" viewBox="0 0 18 18" aria-hidden="true">
              <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" />
              <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.02-3.7H.96v2.33A9 9 0 0 0 9 18z" />
              <path fill="#FBBC05" d="M3.98 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.02-2.33z" />
              <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.46 3.44 1.35l2.58-2.58C13.46.9 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.02 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
            </svg>
            {busy ? "Opening Google…" : "Continue with Google"}
          </button>

          {error && (
            <div className="rounded-xl bg-alert-soft border border-alert/20 px-4 py-3">
              <p className="text-sm font-medium text-alert">{error}</p>
            </div>
          )}

          <button
            onClick={onCancel}
            className="text-sm text-ink-2 hover:text-ink underline self-center"
          >
            Back to browsing
          </button>
        </div>
      </div>
    </div>
  );
}