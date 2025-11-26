import { createSession } from "@volley/vgf/client"
import { type ReactNode, useEffect, useState } from "react"

import { BACKEND_SERVER_ENDPOINT } from "../../util/environment"
import { Loading } from "../Loading/Loading"

/**
 * SessionCreator component for Display clients
 * Creates a new game session and adds the sessionId to the URL
 */
export const SessionCreator = (): ReactNode => {
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const initSession = async (): Promise<void> => {
            try {
                // Create a new session on the server
                const sessionId = await createSession(BACKEND_SERVER_ENDPOINT)

                // Add sessionId to URL and reload
                const url = new URL(window.location.href)
                url.searchParams.set("sessionId", sessionId)
                window.location.href = url.toString()
            } catch (err) {
                console.error("Failed to create session:", err)
                setError(
                    "Failed to create game session. Please refresh the page."
                )
            }
        }

        void initSession()
    }, [])

    if (error) {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                    background: "#222",
                    color: "white",
                    padding: "20px",
                    textAlign: "center",
                }}
            >
                <h2>Error</h2>
                <p>{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    style={{
                        marginTop: "20px",
                        padding: "10px 20px",
                        background: "#ff9800",
                        border: "none",
                        borderRadius: "5px",
                        color: "white",
                        cursor: "pointer",
                    }}
                >
                    Retry
                </button>
            </div>
        )
    }

    return <Loading />
}
