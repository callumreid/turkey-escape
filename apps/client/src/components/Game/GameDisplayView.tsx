import { INITIAL_GRID_SIZE } from "@turkey-escape/server"
import { QRCodeSVG } from "qrcode.react"
import { useEffect, useMemo, useRef } from "react"

import { useDispatchAction, useGameState } from "../../hooks/VGF"

export const GameDisplayView = () => {
    const gameState = useGameState((state) => state)
    const dispatchAction = useDispatchAction()
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const controllerUrl = useMemo(() => {
        const sessionId = new URLSearchParams(window.location.search).get("sessionId") || ""
        return `${window.location.origin}${window.location.pathname}?clientType=CONTROLLER&sessionId=${sessionId}`
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            dispatchAction("tick", {})
        }, 1000 / 30)
        return () => clearInterval(interval)
    }, [dispatchAction])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || !gameState || !gameState.gridSize) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const { width, height } = INITIAL_GRID_SIZE
        const tileSize = 40 // Pixels per tile
        canvas.width = width * tileSize
        canvas.height = height * tileSize

        // Clear screen
        ctx.fillStyle = "#8bc34a" // Grass green
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw River
        ctx.fillStyle = "#2196f3" // Water blue
        ctx.fillRect(0, tileSize, canvas.width, (height - 2) * tileSize)

        // Draw Alligators
        gameState.alligators.forEach((alligator: any) => {
            ctx.fillStyle = "#4caf50" // Alligator green
            ctx.fillRect(
                alligator.position.x * tileSize,
                alligator.position.y * tileSize,
                alligator.width * tileSize,
                tileSize * 0.8
            )

            // Eyes
            ctx.fillStyle = "white"
            const eyeX =
                alligator.direction === 1 ? alligator.width * tileSize - 10 : 5
            ctx.fillRect(
                alligator.position.x * tileSize + eyeX,
                alligator.position.y * tileSize + 5,
                5,
                5
            )
        })

        // Draw Turkey
        const turkey = gameState.turkey
        if (turkey && turkey.isAlive) {
            ctx.fillStyle = "#795548" // Turkey brown
            ctx.beginPath()
            ctx.arc(
                turkey.position.x * tileSize + tileSize / 2,
                turkey.position.y * tileSize + tileSize / 2,
                tileSize / 2 - 5,
                0,
                Math.PI * 2
            )
            ctx.fill()

            // Beak
            ctx.fillStyle = "orange"
            ctx.beginPath()
            ctx.moveTo(
                turkey.position.x * tileSize + tileSize / 2,
                turkey.position.y * tileSize + tileSize / 2
            )
            ctx.lineTo(
                turkey.position.x * tileSize + tileSize / 2 + 10,
                turkey.position.y * tileSize + tileSize / 2 - 5
            )
            ctx.lineTo(
                turkey.position.x * tileSize + tileSize / 2 + 10,
                turkey.position.y * tileSize + tileSize / 2 + 5
            )
            ctx.fill()
        }

        // Draw UI
        ctx.fillStyle = "white"
        ctx.font = "20px Arial"
        ctx.fillText(`Score: ${gameState.score}`, 10, 30)
        ctx.fillText(`Level: ${gameState.level}`, canvas.width - 100, 30)

        if (gameState.gameStatus === "game_over") {
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = "white"
            ctx.font = "40px Arial"
            ctx.textAlign = "center"
            ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2)
            ctx.font = "20px Arial"
            ctx.fillText(
                "Refresh to restart",
                canvas.width / 2,
                canvas.height / 2 + 40
            )
        }
    }, [gameState])

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "#333",
                gap: "20px",
            }}
        >
            <canvas ref={canvasRef} style={{ border: "2px solid white" }} />
            <div
                style={{
                    background: "rgba(0, 0, 0, 0.8)",
                    padding: "20px 30px",
                    borderRadius: "12px",
                    color: "white",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                }}
            >
                <div
                    style={{
                        background: "white",
                        padding: "10px",
                        borderRadius: "8px",
                    }}
                >
                    <QRCodeSVG value={controllerUrl} size={100} />
                </div>
                <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px" }}>
                        📱 Scan to Play
                    </div>
                    <div style={{ fontSize: "12px", opacity: 0.7, marginBottom: "10px" }}>
                        Use your phone as a controller
                    </div>
                    <div
                        style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            padding: "8px 12px",
                            borderRadius: "4px",
                            fontFamily: "monospace",
                            fontSize: "10px",
                            cursor: "pointer",
                            maxWidth: "300px",
                            wordBreak: "break-all",
                        }}
                        onClick={() => {
                            navigator.clipboard.writeText(controllerUrl)
                            alert("Controller URL copied!")
                        }}
                    >
                        {controllerUrl}
                    </div>
                </div>
            </div>
        </div>
    )
}
