import {
    type ExtendedSocketIOServerMiddleware,
    SocketIOTransport,
} from "@volley/vgf/server"
import { ClientType } from "@volley/vgf/types"

import { PARTY_MODE_MAX_PLAYERS } from "./constants/GameConfig.ts"
import { RoomFullError } from "./errors/RoomFullError.ts"
import { UnknownError } from "./errors/UnknownError.ts"
import { httpServer } from "./express.ts"
import { redis } from "./redis.ts"
import { storage } from "./storage.ts"

export const transport = new SocketIOTransport({
    httpServer,
    redisClient: redis,
    storage,
    socketOptions: {
        cors: {
            origin: [
                "http://localhost:3000",
                "http://127.0.0.1:3000",
                "http://localhost:9001",
                "http://127.0.0.1:9001",
            ],
            methods: ["GET", "POST"],
            credentials: true,
        },
    },
})

const roomFullMiddleware: ExtendedSocketIOServerMiddleware = (socket, next) => {
    const { session } = socket
    const { userId, clientType } = socket.handshake.query

    switch (clientType) {
        case ClientType.Display:
            return next()
        case ClientType.Controller: {
            if (session.members[userId]) {
                return next()
            }

            const controllers = Object.values(session.members).filter(
                (member) => member.clientType === ClientType.Controller
            )

            if (controllers.length >= PARTY_MODE_MAX_PLAYERS) {
                return next(new RoomFullError())
            }

            return next()
        }
        default:
            return next(new UnknownError("Unknown client type"))
    }
}

transport.registerMiddleware(roomFullMiddleware)
