# Qless Kenya

A digital queue and appointment platform for Kenyan service businesses. Take a ticket before you leave the house, watch the line move in real time, and arrive when it's nearly your turn.

Built with React 19, Vite and Tailwind v4.

---

## The idea

At a hospital, bank or Huduma Centre, the only way to hold your place in line is to physically stand in it — with no way of knowing whether that's ten minutes or two hours. Qless turns the paper ticket into a live one.

Businesses subscribe for queue management, notifications and analytics. Joining a queue is free for customers.

---

## What works today

| Screen | File | What it does |
| --- | --- | --- |
| Browse | `Pages/Browse.jsx` | Search and filter businesses, see live wait times |
| Join queue | `Pages/Joinqueue.jsx` | Pick party size, set alerts, confirm |
| Live queue | `Pages/Livequeue.jsx` | Ticket number, position rail, progress, upcoming numbers |
| Dashboard | `Pages/Dashboard.jsx` | Active ticket summary, or an empty state |
| Sign up | `Pages/Signup.jsx` | Four-field form with per-field validation |
| Log in | `Pages/Login.jsx` | Email and password against saved account |

The full loop runs end to end: browse → join → live tracking → leave.

---

## Getting started

You'll need Node 18 or newer.

```bash
git clone <your-repo-url>
cd QLESS_Ke
npm install
npm run dev
```

Open the URL Vite prints, usually `http://localhost:5173`.

Other commands:

```bash
npm run build     # production build into dist/
npm run preview   # serve the production build locally
npm run lint      # eslint
```

---

## Project structure

```
src/
  App.jsx              all state, page switching, auth gate
  main.jsx             entry point
  index.css            the @theme block — whole palette lives here

  components/
    Navbar.jsx         top bar, current page, log in / log out
    Button.jsx         5 variants, 3 sizes, disabled
    Input.jsx          labelled field with error state
    Statusbadge.jsx    coloured pills + waitTone()
    Businesscard.jsx   one card in the browse grid
    Queueticket.jsx    the ticket, with a live "updated Xs ago" timer

  Pages/
    Browse.jsx
    Joinqueue.jsx
    Livequeue.jsx
    Dashboard.jsx
    Login.jsx
    Signup.jsx         also exports AuthShell, the split-screen layout

  Lib/
    Auth.js            saveUser / getUser / clearUser / checkLogin

  data/
    business.js        6 sample businesses
```

---

## How it works

### State lives in one place

`App.jsx` holds five pieces of state. Everything else is told what to show and reports back when clicked — props down, events up.

```js
const [page, setPage]             = useState("browse");
const [user, setUser]             = useState(getUser());
const [selectedId, setSelectedId] = useState(null);
const [ticket, setTicket]         = useState(null);
const [afterAuth, setAfterAuth]   = useState("browse");
```

Page switching is `useState` rather than React Router. That's a deliberate choice while the app is small — Router goes in when the back button needs to work or pages need shareable URLs.

`selectedId` stores an id, not a whole business. `App` looks the object up with `.find()` when it needs it, so there's only ever one copy of the truth in `data/business.js`.

### Auth is deferred to the end of the flow

You can browse and configure a queue without an account. Auth is only required at the moment of joining:

```
Browse → pick a business → Join queue
                              │
                    logged in ├──→ ticket created → Live queue
                              │
                   logged out └──→ Sign up → back to Join queue
```

`afterAuth` is how `App.jsx` remembers where to return once the account is made.

### Accounts are stored in the browser

`Lib/Auth.js` reads and writes a single localStorage key, `qless_user`. `saveUser` stringifies the object on the way in, `getUser` parses it on the way out and returns `null` when nothing is stored.

`checkLogin` returns an object rather than a boolean:

```js
{ ok: true, user }                         // success
{ ok: false, error: "That password isn't right." }
```

That way `Login.jsx` can show a specific message instead of a generic failure.

### Styling

Tailwind v4 — no `tailwind.config.js`. The entire palette is a `@theme` block in `src/index.css`, and each variable generates its own utilities:

```css
@theme {
  --color-brand: #ff5a5f;   /* → bg-brand, text-brand, border-brand */
  --color-ink:   #222222;
  --color-teal:  #00a699;
}
```

Change a hex there and the whole app follows. Nothing in the JSX has a raw colour in it.

Colour is doing two separate jobs and they're kept apart on purpose. Coral is brand and primary actions. Queue states run on their own scale — teal under 15 minutes, amber to 35, red beyond — so "long wait" still reads as a warning rather than blending into the buttons.

---

## Known limitations

These are deliberate for a learning-stage build, not oversights.

- **Passwords are stored in plain text in localStorage.** Readable by anyone with DevTools open. This cannot ship. A real version sends the password to a server, hashes it, and returns only a session token.
- **One account per browser.** There's a single storage key, so signing up twice overwrites the first account.
- **No backend.** Businesses come from `data/business.js`, and queue positions don't actually move.
- **No routing.** The back button doesn't navigate, and pages have no URLs of their own.
- **Desktop-first.** Layouts hold up down to tablet, but the mobile pass hasn't been done — and the consumer side needs it most, since people check their queue while moving around.

---

## Roadmap

- Bookings and appointments page (placeholder exists in `App.jsx`)
- Business-side dashboard: live queue table, call next, analytics
- Real backend with proper authentication
- SMS alerts before your number is called
- Category filters wired to actual filtering
- Persist the active ticket so a refresh doesn't lose it

---

## Conventions

**Filenames are case-sensitive on Linux, but not on Windows.** The app can run locally with a wrong capital and then fail to build on Vercel or Netlify. Imports must match filenames exactly.

If you need to fix a name, rename it to something else first, then to the name you want — a case-only rename doesn't register on Windows, in the filesystem or in git. Reload the VS Code window afterwards, since the editor caches the old name and shows red squiggles on imports that are actually fine.

If you're setting up on Windows, this also helps:

```bash
git config core.ignorecase false
```

---

## Author

Laletty Murathe