# Events Client

React and Vite frontend for the Events Module. See the [root README](../README.md) for full-stack setup.

## Configure

From the client directory, copy the environment template:

```powershell
Copy-Item .env.example .env
```

`VITE_API_URL` defaults to `/api/events`. During development, Vite proxies `/api` to `http://localhost:5000`.

## Run

```powershell
npm install
npm run dev
```

## Check

```powershell
npm run lint
npm run build
```
