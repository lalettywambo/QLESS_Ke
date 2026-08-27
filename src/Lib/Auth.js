const KEY = "qless_user";

export function saveUser(user) {
  localStorage.setItem(KEY, JSON.stringify(user));
}

export function getUser() {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

export function clearUser() {
  localStorage.removeItem(KEY);
}

export function checkLogin(email, password) {
  const user = getUser();

  if (!user) return { ok: false, error: "No account found. Sign up first." };
  if (user.email !== email.trim().toLowerCase())
    return { ok: false, error: "We don't recognise that email." };
  if (user.password !== password)
    return { ok: false, error: "That password isn't right." };

  return { ok: true, user };
}