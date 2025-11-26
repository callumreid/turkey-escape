import { createLogger } from "@volley/logger"

import { LOG_LEVEL } from "./environment"

export const logger = createLogger({
    type: "browser",
    browser: {},
    level: LOG_LEVEL,
})
