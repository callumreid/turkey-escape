import { MemoryStorage, RedisPersistence } from "@volley/vgf/server"

import { logger } from "./logger.ts"
import { redis } from "./redis.ts"

const persistence = new RedisPersistence({
    redisClient: redis,
    logger,
})

export const storage = new MemoryStorage({
    persistence,
})
