#!/bin/bash

SERVER_PORT=3001
CLIENT_PORT=3000

kill_port() {
    local port=$1
    local pids=$(lsof -ti :$port 2>/dev/null)
    if [ -n "$pids" ]; then
        echo "⚠️  Port $port is in use, killing processes: $pids"
        echo "$pids" | xargs kill -9 2>/dev/null
        sleep 0.5
    fi
}

echo "🦃 Starting Turkey Escape..."
echo ""

kill_port $SERVER_PORT
kill_port $CLIENT_PORT

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "🔧 Starting server on port $SERVER_PORT..."
cd "$SCRIPT_DIR/apps/server" && pnpm dev &
SERVER_PID=$!

echo "🎮 Starting client on port $CLIENT_PORT..."
cd "$SCRIPT_DIR/apps/client" && pnpm dev &
CLIENT_PID=$!

echo ""
echo "⏳ Waiting for server to be ready..."

for i in {1..30}; do
    if curl -s http://localhost:$SERVER_PORT/health > /dev/null 2>&1 || curl -s -X POST http://localhost:$SERVER_PORT/api/session -H "Content-Type: application/json" -d '{}' > /dev/null 2>&1; then
        break
    fi
    sleep 1
done

SESSION_RESPONSE=$(curl -s -X POST http://localhost:$SERVER_PORT/api/session -H "Content-Type: application/json" -d '{}')
SESSION_ID=$(echo $SESSION_RESPONSE | grep -o '"sessionId":"[^"]*"' | cut -d'"' -f4)

if [ -z "$SESSION_ID" ]; then
    echo "❌ Failed to create session. Server may not be ready."
    echo "   Try running the script again or check server logs."
else
    echo ""
    echo "✅ Turkey Escape is ready!"
    echo ""
    echo "════════════════════════════════════════════════════════════════"
    echo ""
    echo "📺 DISPLAY URL:"
    echo "   http://localhost:$CLIENT_PORT/?clientType=DISPLAY&sessionId=$SESSION_ID"
    echo ""
    echo "🎮 CONTROLLER URL:"
    echo "   http://localhost:$CLIENT_PORT/?clientType=CONTROLLER&sessionId=$SESSION_ID"
    echo ""
    echo "════════════════════════════════════════════════════════════════"
fi

echo ""
echo "Press Ctrl+C to stop"
echo ""

trap "kill $SERVER_PID $CLIENT_PID 2>/dev/null; exit" INT

wait
