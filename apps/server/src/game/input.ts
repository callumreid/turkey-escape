import type { GameState } from "../types/GameState.ts"

export const moveTurkey = (
    state: GameState,
    _playerId: string,
    direction: "up" | "down" | "left" | "right"
) => {
    if (state.gameStatus !== "playing") return

    const { turkey, gridSize } = state
    let { x, y } = turkey.position

    switch (direction) {
        case "up":
            y -= 1
            break
        case "down":
            y += 1
            break
        case "left":
            x -= 1
            break
        case "right":
            x += 1
            break
    }

    // Clamp to grid
    x = Math.max(0, Math.min(x, gridSize.width - 1))
    y = Math.max(0, Math.min(y, gridSize.height - 1))

    state.turkey.position = { x, y }
}
