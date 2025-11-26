import dotenv from "dotenv"

dotenv.config()

export const STAGE = process.env.STAGE || "production"

export const LOG_LEVEL = process.env.LOG_LEVEL || "debug"

export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001

export const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379"
