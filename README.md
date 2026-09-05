# Dream Digital Hub — Website

A simple static website (no login, no database, no admin panel). Content —
services, pricing, FAQ, team, contact details, logo — lives in one file:
`public/data.json`. To update anything on the site, edit that file directly
and redeploy.

## Local setup

```
npm install
npm start
```

Open http://localhost:3000

## Editing content

Open `public/data.json` in any text editor. It's plain JSON:
- `logo.image` — path to the logo file (already set to `/uploads/logo.jpg`)
- `hero` — homepage heading/description
- `services` — array of services, each with `name`, `desc`, `price`
- `pricing` — the 3 bundled plans (Basic / Standard / Professional). Add
  `"popular": true` to any plan to show the "Most Popular" badge
- `faq` — array of `{ "q": ..., "a": ... }` question/answer pairs
- `team` — **do not edit this** — Founder / Co-Founder / Web Developer
  profiles are meant to stay fixed
- `contact` — phone, email, WhatsApp number
- `footer` — footer copyright text

After saving changes, commit and push to GitHub — Render will redeploy
automatically.

## Deploying on Render

1. Push this project to a GitHub repository.
2. On Render, create a new Web Service and connect the repository.
3. Build Command: `npm install` — Start Command: `npm start`
4. No environment variables are required — deploy and it's live.

## Structure
```
dream-digital-hub/
├── server.js            # plain static file server
├── package.json
├── public/
│   ├── data.json         # all editable website content
│   ├── index.html         # Home
│   ├── services.html      # Services + Pricing + FAQ
│   ├── about.html         # Team
│   ├── contact.html       # Contact
│   ├── style.css
│   ├── script.js
│   └── uploads/            # logo + team photos
```
