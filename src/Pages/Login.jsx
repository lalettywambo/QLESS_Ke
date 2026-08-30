import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { checkLogin } from "../Lib/Auth";
import { AuthShell } from "./Signup";

export default function Login({ onDone, onGoToSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const result = checkLogin(email, password);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setError("");
    onDone(result.user);
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to pick up where your queue left off."
      onSubmit={handleSubmit}
      footer={
        <>
          New to qless?{" "}
          <button
            type="button"
            onClick={onGoToSignUp}
            className="font-semibold text-ink underline"
          >
            Create an account
          </button>
        </>
      }
    >
      <Input
        label="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && (
        <div className="rounded-xl bg-alert-soft border border-alert/20 px-4 py-3">
          <p className="text-sm font-medium text-alert">{error}</p>
        </div>
      )}

      <Button type="submit" fullWidth size="lg">
        Log in
      </Button>
    </AuthShell>
  );
}