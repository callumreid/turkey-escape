import { FailoverVGFServiceFactory } from "@volley/vgf/server"

import { PORT } from "./environment.ts"
import { httpServer } from "./express.ts"
import { app } from "./express.ts"
import { game } from "./game/game.ts"
import { logger } from "./logger.ts"
import { runtimeStore } from "./runtime.ts"
import { storage } from "./storage.ts"
import { transport } from "./transport.ts"
import type { GameState } from "./types/GameState.ts"

export const server = FailoverVGFServiceFactory.create<GameState>({
    game: game as any,
    port: PORT,
    logger,
    app,
    httpServer,
    transport,
    storage,
    runtimeStore,
})
