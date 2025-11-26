import { RedisRuntimeSchedulerStore } from "@volley/vgf/server"

import { logger } from "./logger.ts"
import { redis } from "./redis.ts"

export const runtimeStore = new RedisRuntimeSchedulerStore({
    redisClient: redis,
    logger,
})
