import cors from "cors"
import express, { type Express } from "express"
import { createServer } from "http"

export const app: Express = express()
export const httpServer = createServer(app)

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "http://localhost:3002",
            "http://127.0.0.1:3002",
            "http://localhost:9001",
            "http://127.0.0.1:9001",
        ],
        credentials: true,
    })
)
