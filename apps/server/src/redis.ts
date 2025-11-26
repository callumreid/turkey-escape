import { Redis } from "ioredis"

import { REDIS_URL } from "./environment.ts"
import { logger } from "./logger.ts"

export const redis = new Redis(REDIS_URL)

redis.on("error", (err) => {
    logger.error("Redis connection error:", err)
})

redis.on("connect", () => {
    logger.info("Connected to Redis")
})
