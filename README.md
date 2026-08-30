# Qless Kenya

Queue and appointment app for Kenyan service businesses. Join a queue from your phone, track your position, show up when it's nearly your turn.

React 19, Vite, Tailwind v4.

## Setup

Needs Node 18+.

```bash
git clone https://github.com/lalettyw/qless-ke.git
cd qless-ke
npm install
npm run dev
```

Runs on http://localhost:5173

`npm run build` for production, `npm run preview` to check the build locally, `npm run lint` for eslint.

## Screens

| Screen | File |
| --- | --- |
| Browse | `Pages/Browse.jsx` |
| Join queue | `Pages/Joinqueue.jsx` |
| Live queue | `Pages/Livequeue.jsx` |
| Dashboard | `Pages/Dashboard.jsx` |
| Sign up | `Pages/Signup.jsx` |
| Log in | `Pages/Login.jsx` |

Browse to join to live tracking works end to end.

## Structure

```
src/
  App.jsx              state, page switching, auth gate
  main.jsx
  index.css            @theme block, all colours

  components/
    Navbar.jsx
    Button.jsx         5 variants, 3 sizes
    Input.jsx          labelled field with error state
    Statusbadge.jsx    pills + waitTone()
    Businesscard.jsx
    Queueticket.jsx    has its own timer

  Pages/
    Browse.jsx  Joinqueue.jsx  Livequeue.jsx
    Dashboard.jsx  Login.jsx  Signup.jsx

  Lib/
    Auth.js            localStorage read/write

  data/
    business.js        6 sample businesses
```

## State

Everything lives in `App.jsx`:

```js
const [page, setPage]             = useState("browse");
const [user, setUser]             = useState(getUser());
const [selectedId, setSelectedId] = useState(null);
const [ticket, setTicket]         = useState(null);
const [afterAuth, setAfterAuth]   = useState("browse");
```

Pages get told what to show and call functions back up. No routing library yet, `page` is just a string and the bottom of App.jsx switches on it.

`selectedId` holds an id, not the whole business. App looks it up with `.find()` so there's one copy of the data.

## Auth

You can browse and set up a queue without an account. Signing up only happens when you actually press Join:

```
Join queue → logged in?  yes → ticket, go to Live queue
                         no  → Sign up, then back to Join
```

`afterAuth` stores where to return to.

`Lib/Auth.js` writes to one localStorage key, `qless_user`. `checkLogin` returns `{ ok, error }` rather than true/false so Login can show a useful message.

## Styling

No `tailwind.config.js`. Tailwind v4 reads the theme from CSS:

```css
@theme {
  --color-brand: #ff5a5f;   /* bg-brand, text-brand, border-brand */
  --color-ink:   #222222;
  --color-teal:  #00a699;
}
```

Coral is brand and buttons. Wait times use their own colours (teal under 15 min, amber to 35, red over) so a bad wait doesn't look like a button.

## Not done yet

- Passwords sit in localStorage in plain text. Fine for now, can't ship.
- One account per browser. Signing up twice overwrites the first.
- No backend. Businesses are hardcoded and queue positions don't move.
- Back button doesn't work, no URLs per page.
- Mobile layouts not done.

## Contributing

Laletty Murathe, reviewed by Edmond Omwega.

Branch off main, small commits, PR against main. Run `npm run build` before pushing, dev mode lets things through that the build won't.

Good first things to pick up:

- Category pills don't filter yet, only highlight. Search already does it, copy that.
- Ticket disappears on refresh. Save it like Auth.js saves the user.
- After signing up mid-join you land back on the Join page and have to press it again.

Filenames are case sensitive on Linux but not Windows, so a wrong capital runs fine locally and fails on Vercel. `git ls-files src` shows what git actually has. Also run `git config core.ignorecase false` once, otherwise renaming `auth.js` to `Auth.js` does nothing.

## Roadmap

- Bookings page (placeholder in App.jsx)
- Business dashboard: live queue table, call next, analytics
- Backend and real auth
- SMS before your turn