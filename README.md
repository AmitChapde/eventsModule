# Events Module

A full-stack event manager built with React, Vite, Express, and MongoDB. It supports browsing, creating, editing, and RSVPing to events.

## Requirements

- Node.js and npm
- MongoDB running locally or a MongoDB connection URI

## Environment files

Copy each example file to `.env` in the same folder, then adjust values for your environment:

```powershell
Copy-Item server/.env.example server/.env
Copy-Item client/.env.example client/.env
```

- `server/.env.example` sets `PORT` and `MONGO_URI`. The example URI connects to a local database named `events-module`.
- `client/.env.example` sets `VITE_API_URL`. The local Vite proxy forwards `/api` requests to the server on port `5000`.

Do not commit `.env` files or put secrets in client-side variables. Vite exposes `VITE_` variables to the browser.

## Run locally

Start the API in one terminal:

```powershell
cd server
npm install
npm run dev
```

Start the client in another terminal:

```powershell
cd client
npm install
npm run dev
```

Vite prints the client URL after startup. The API listens on `http://localhost:5000` by default.

## Client checks

```powershell
cd client
npm run lint
npm run build
```

## API routes

- `GET /api/events` lists events.
- `GET /api/events/:id` returns one event.
- `POST /api/events` creates an event.
- `PUT /api/events/:id` updates an event.
- `POST /api/events/:id/rsvp` records an RSVP.
