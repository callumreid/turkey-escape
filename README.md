# 🦃 Turkey Escape

A Frogger-style game where you control a turkey trying to cross a river full of alligators! Use your phone as a controller by scanning the QR code.

## How to Play

1. **Display**: Open on your TV/computer
2. **Controller**: Scan the QR code with your phone
3. **Goal**: Guide your turkey to the top of the screen without getting eaten by alligators!

## Local Development

```bash
# Install dependencies
pnpm install

# Start the game (server + client)
./start.sh
```

The start script will:
- Kill any processes on ports 3000/3001
- Start the server and client
- Create a session
- Print ready-to-use URLs for display and controller

## Deployment

### Server (Railway - Free Tier)

The server requires WebSockets and Redis, so it needs Railway:

1. Go to [railway.app](https://railway.app)
2. Create new project → "Deploy from GitHub repo"
3. Select this repo, set root directory to `apps/server`
4. Add Redis: "+ New" → "Database" → "Redis"
5. Add environment variables:
   ```
   PORT=3001
   REDIS_URL=${{Redis.REDIS_URL}}
   NODE_ENV=production
   ```

### Client (Vercel)

1. Go to [vercel.com](https://vercel.com)
2. Import this repo
3. Configure:
   - **Root Directory**: `apps/client`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
4. Add environment variable:
   ```
   VITE_BACKEND_SERVER_ENDPOINT=https://your-railway-server.up.railway.app
   ```

## Tech Stack

- **Client**: React 19 + Vite + TypeScript
- **Server**: Express + Socket.IO + Redis
- **Framework**: VGF (Volley Game Framework)

## Project Structure

```
turkey-escape/
├── apps/
│   ├── client/     # React frontend
│   └── server/     # Game server
├── start.sh        # Local development script
└── package.json    # Root workspace config
```
