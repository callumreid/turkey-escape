import { PORT } from "./environment.ts"
import { logger } from "./logger.ts"
import { redis } from "./redis.ts"
import { server } from "./server.ts"

try {
    server.start()

    logger.info(`🚀 VGF Example Server running on port ${PORT}`)
} catch (error) {
    logger.error("Failed to start server:", error)

    process.exit(1)
}

process.on("SIGINT", async () => {
    logger.info("Shutting down server...")
    server.stop()
    await redis.quit()
    process.exit(0)
})

process.on("SIGTERM", async () => {
    logger.info("Shutting down server...")
    server.stop()
    await redis.quit()
    process.exit(0)
})
