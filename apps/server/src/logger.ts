import { createLogger } from "@volley/logger"

import { LOG_LEVEL, STAGE } from "./environment"

const transport =
    STAGE === "local"
        ? {
              target: "pino-pretty",
          }
        : undefined

export const logger = createLogger({
    type: "node",
    level: LOG_LEVEL,
    transport,
})
