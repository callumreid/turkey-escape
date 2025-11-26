import { PhaseName } from "@turkey-escape/server"
import {
    getSessionIdFromQueryParams,
    ServerToClientEventName,
    useVGFClient,
} from "@volley/vgf/client"
import { type ReactNode, useEffect, useState } from "react"

import type { AvatarOption } from "../constants/avatarOptions"
import {
    getPlayerAvatarKey,
    getPlayerNameKey,
    getPlayerSessionKey,
} from "../constants/localStorage"
import { usePhase } from "../hooks/VGF"
import { getUserId } from "../util/getUserId"
import { GameControllerView } from "./Game/GameControllerView"
import { Join } from "./Join/Join"
import { Loading } from "./Loading/Loading"

export const ControllerView = (): ReactNode => {
    const client = useVGFClient()

    const phase = usePhase()

    const [isConnected, setIsConnected] = useState(false)
    const [isReconnecting, setIsReconnecting] = useState(true)

    useEffect(() => {
        const attemptReconnect = (): void => {
            const userId = getUserId()

            // Controllers MUST have a sessionId to join
            let currentSessionId: string
            try {
                currentSessionId = getSessionIdFromQueryParams()
            } catch {
                // No sessionId - controller can't create sessions
                setIsReconnecting(false)
                return
            }

            const storedSessionId = localStorage.getItem(
                getPlayerSessionKey(userId)
            )

            if (storedSessionId !== currentSessionId) {
                setIsReconnecting(false)
                return
            }

            const storedName = localStorage.getItem(getPlayerNameKey(userId))
            const storedAvatar = localStorage.getItem(
                getPlayerAvatarKey(userId)
            )

            if (storedName && storedAvatar) {
                const name = JSON.parse(storedName) as string
                const avatarUrl = JSON.parse(storedAvatar) as AvatarOption

                if (name.trim()) {
                    client.connect({
                        name,
                        avatarUrl,
                    })
                    return
                }
            }

            setIsReconnecting(false)
        }

        attemptReconnect()

        client.on(ServerToClientEventName.CONNECT, () => {
            setIsConnected(true)
            setIsReconnecting(false)
        })
    }, [client])

    if (!isConnected) {
        if (isReconnecting) {
            return <Loading />
        }
        return <Join />
    }

    switch (phase) {
        case PhaseName.Game:
            return <GameControllerView />
        default:
            return <Loading />
    }
}
