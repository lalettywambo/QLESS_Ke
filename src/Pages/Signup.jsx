import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { saveUser } from "../Lib/Auth";

export default function SignUp({ onDone, onGoToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    const found = {};

    if (name.trim().length < 2) found.name = "Enter your full name.";
    if (!email.includes("@")) found.email = "That doesn't look like an email.";
    if (password.length < 6) found.password = "Use at least 6 characters.";
    if (confirm !== password) found.confirm = "Passwords don't match.";

    setErrors(found);

    if (Object.keys(found).length > 0) return;

    const user = { name: name.trim(), email: email.trim().toLowerCase(), password };
    saveUser(user);
    onDone(user);
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Last step before your ticket is issued."
      onSubmit={handleSubmit}
      footer={
        <>
          Already have an account?{" "}
          <button
            type="button"
            onClick={onGoToLogin}
            className="font-semibold text-ink underline"
          >
            Log in
          </button>
        </>
      }
    >
      <Input
        label="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Laletty Murathe"
        error={errors.name}
      />
      <Input
        label="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        error={errors.email}
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="At least 6 characters"
        error={errors.password}
      />
      <Input
        label="Confirm password"
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        error={errors.confirm}
      />

      <Button type="submit" fullWidth size="lg">
        Create account
      </Button>
    </AuthShell>
  );
}

export function AuthShell({ title, subtitle, children, footer, onSubmit }) {
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
        <form onSubmit={onSubmit} className="w-full max-w-[420px] flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-[32px] font-extrabold tracking-tight">{title}</h1>
            <p className="text-ink-2">{subtitle}</p>
          </div>

          <div className="flex flex-col gap-4">{children}</div>

          <p className="text-sm text-ink-2 text-center">{footer}</p>
        </form>
      </div>
    </div>
  );
}