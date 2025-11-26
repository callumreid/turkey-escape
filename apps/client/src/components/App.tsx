import {
    ClientType,
    createSocketIOClientTransport,
    getClientTypeFromQueryParams,
    getSessionIdFromQueryParams,
    VGFProvider,
} from "@volley/vgf/client"
import { type ReactNode } from "react"

import { RoomFullError } from "../../../server/src/errors/RoomFullError"
import { UnauthorizedError } from "../../../server/src/errors/UnauthorizedError"
import { BACKEND_SERVER_ENDPOINT } from "../util/environment"
import { getUserId } from "../util/getUserId"
import { logger } from "../util/logger"
import { ErrorBoundary } from "./ErrorBoundary/ErrorBoundary"
import { ErrorProvider, useError } from "./ErrorToast/ErrorProvider"
import { Router } from "./Router"
import { SessionCreator } from "./SessionCreator/SessionCreator"

const AppContent = (): ReactNode => {
    const clientType = getClientTypeFromQueryParams()

    // For Display clients: create session if missing
    // For Controller clients: they should get sessionId from joining a display
    let sessionId: string | null = null
    let needsSessionCreation = false

    try {
        sessionId = getSessionIdFromQueryParams()
    } catch {
        // No sessionId in URL
        if (clientType === ClientType.Display) {
            // Display should create a session
            needsSessionCreation = true
        } else {
            // Controller without sessionId - this is an error
            // but we'll let VGF handle it
            sessionId = ""
        }
    }

    // If Display needs to create a session, show SessionCreator
    if (needsSessionCreation) {
        return <SessionCreator />
    }

    const userId = getUserId()

    const { showError } = useError()

    const transport = createSocketIOClientTransport({
        url: BACKEND_SERVER_ENDPOINT,
        query: {
            sessionId: sessionId || "",
            userId,
            clientType,
        },
        onConnectError: (error: Error): void => {
            const msg = String(error?.message || "").toLowerCase()

            if (
                msg.includes("timeout") ||
                msg.includes("websocket") ||
                msg.includes("transport") ||
                msg.includes("xhr poll") ||
                msg.includes("network")
            ) {
                return
            }

            if (error instanceof RoomFullError) {
                showError(error.message, {
                    title: "Room is Full",
                    duration: 6000,
                })
                return
            }

            if (error instanceof UnauthorizedError) {
                showError(error.message, {
                    title: "Unauthorized",
                    duration: 5000,
                })
                return
            }

            showError(String(error?.message || "Unknown error"), {
                title: "Connection Error",
                duration: 5000,
            })
        },
    })

    return (
        <VGFProvider
            transport={transport}
            logger={logger}
            clientOptions={{ autoConnect: false }}
        >
            <Router />
        </VGFProvider>
    )
}

export const App = (): ReactNode => {
    return (
        <ErrorBoundary>
            <ErrorProvider>
                <AppContent />
            </ErrorProvider>
        </ErrorBoundary>
    )
}
