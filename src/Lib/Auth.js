import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { ok: true, user: toUser(result.user) };
  } catch (error) {
    console.error("Google sign-in failed:", error.code, error.message);
    return { ok: false, error: readableError(error.code) };
  }
}

export async function logOut() {
  await signOut(auth);
}

// calls back with the user (or null) now and on every future sign in/out
export function watchUser(callback) {
  return onAuthStateChanged(auth, (firebaseUser) => {
    callback(firebaseUser ? toUser(firebaseUser) : null);
  });
}

function toUser(firebaseUser) {
  return {
    id: firebaseUser.uid,
    name: firebaseUser.displayName ?? "Friend",
    email: firebaseUser.email,
    photo: firebaseUser.photoURL,
  };
}

function readableError(code) {
  if (code === "auth/popup-closed-by-user") return "You closed the sign-in window.";
  if (code === "auth/cancelled-popup-request") return "";
  if (code === "auth/popup-blocked")
    return "Your browser blocked the popup. Allow popups and try again.";
  if (code === "auth/network-request-failed")
    return "Can't reach Google. Check your connection.";
  if (code === "auth/configuration-not-found")
    return "Auth isn't switched on yet. Enable Google sign-in in the Firebase console.";
  if (code === "auth/operation-not-allowed")
    return "Google sign-in isn't enabled for this project yet.";
  if (code === "auth/unauthorized-domain")
    return "This domain isn't allowed. Add it under Auth > Settings > Authorized domains.";
  return `Sign-in failed (${code}). Check the console for details.`;
}