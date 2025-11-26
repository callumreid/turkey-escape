import type { BaseGameState } from "@volley/vgf/types"

export interface Position {
    x: number
    y: number
}

export interface Alligator {
    id: string
    position: Position
    speed: number // tiles per second
    direction: 1 | -1 // 1 for right, -1 for left
    width: number // in tiles
}

export interface Turkey {
    position: Position
    isAlive: boolean
    hasWon: boolean
}

export interface GameState extends BaseGameState {
    turkey: Turkey
    alligators: Alligator[]
    level: number
    score: number
    gridSize: { width: number; height: number }
    gameStatus: "playing" | "game_over" | "level_complete"
}

export const INITIAL_GRID_SIZE = { width: 15, height: 15 }
export const TILE_SIZE = 1 // Logical unit
