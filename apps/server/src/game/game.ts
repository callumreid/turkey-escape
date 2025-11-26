import { PhaseName } from "../constants/PhaseName.ts"
import type { Alligator, GameState } from "../types/GameState.ts"
import { INITIAL_GRID_SIZE } from "../types/GameState.ts"
import { moveTurkey } from "./input.ts"

const BASE_SPAWN_RATE = 0.008
const TICK_RATE = 30
const BASE_SPEED_MIN = 1.0
const BASE_SPEED_MAX = 2.0

const createInitialState = (): GameState => {
    return {
        phase: PhaseName.Game,
        turkey: {
            position: {
                x: Math.floor(INITIAL_GRID_SIZE.width / 2),
                y: INITIAL_GRID_SIZE.height - 1,
            },
            isAlive: true,
            hasWon: false,
        },
        alligators: [],
        level: 1,
        score: 0,
        gridSize: INITIAL_GRID_SIZE,
        gameStatus: "playing",
    }
}

const getSpawnRate = (level: number): number => {
    return BASE_SPAWN_RATE * (1 + (level - 1) * 0.3)
}

const getSpeed = (level: number): number => {
    const multiplier = 1 + (level - 1) * 0.15
    const min = BASE_SPEED_MIN * multiplier
    const max = BASE_SPEED_MAX * multiplier
    return min + Math.random() * (max - min)
}

const spawnAlligator = (state: GameState) => {
    const spawnRate = getSpawnRate(state.level)
    for (let y = 1; y < state.gridSize.height - 1; y++) {
        if (Math.random() < spawnRate) {
            const direction = Math.random() > 0.5 ? 1 : -1
            const speed = getSpeed(state.level)
            const x = direction === 1 ? -2 : state.gridSize.width + 1

            const alligator: Alligator = {
                id: Math.random().toString(36).substring(7),
                position: { x, y },
                speed,
                direction,
                width: 1 + Math.floor(Math.random() * 2),
            }
            state.alligators.push(alligator)
        }
    }
}

const updateAlligators = (state: GameState, dt: number) => {
    state.alligators.forEach((alligator) => {
        alligator.position.x += alligator.speed * alligator.direction * dt
    })

    // Remove off-screen alligators
    state.alligators = state.alligators.filter(
        (a) => a.position.x > -5 && a.position.x < state.gridSize.width + 5
    )
}

const checkCollisions = (state: GameState) => {
    const turkeyBox = {
        x: state.turkey.position.x,
        y: state.turkey.position.y,
        width: 0.8,
        height: 0.8,
    }

    for (const alligator of state.alligators) {
        const alligatorBox = {
            x: alligator.position.x,
            y: alligator.position.y,
            width: alligator.width,
            height: 0.8,
        }

        if (
            turkeyBox.x < alligatorBox.x + alligatorBox.width &&
            turkeyBox.x + turkeyBox.width > alligatorBox.x &&
            turkeyBox.y < alligatorBox.y + alligatorBox.height &&
            turkeyBox.y + turkeyBox.height > alligatorBox.y
        ) {
            state.gameStatus = "game_over"
            state.turkey.isAlive = false
        }
    }
}

const checkWin = (state: GameState) => {
    if (state.turkey.position.y === 0) {
        state.level++
        state.score += 100
        state.turkey.position = {
            x: Math.floor(state.gridSize.width / 2),
            y: state.gridSize.height - 1,
        }
        // Clear alligators for a fresh start or keep them? Let's keep them for continuous play but maybe clear near start
        state.alligators = state.alligators.filter(
            (a) => a.position.y < state.gridSize.height - 3
        )
    }
}

export const game = {
    setup: createInitialState,
    actions: {
        move: {
            action: (
                ctx: any,
                { direction }: { direction: "up" | "down" | "left" | "right" }
            ) => {
                const state = { ...ctx.session.state } as GameState
                if (state.gameStatus !== "playing") return state
                moveTurkey(state, "player", direction)
                return state
            },
        },
        restart: {
            action: () => {
                return createInitialState()
            },
        },
        tick: {
            action: (ctx: any) => {
                const state = { ...ctx.session.state } as GameState
                if (state.gameStatus !== "playing") return state

                const dt = 1 / TICK_RATE
                spawnAlligator(state)
                updateAlligators(state, dt)
                checkCollisions(state)
                checkWin(state)
                return state
            },
        },
    },
    thunks: {},
    reducers: {},
    phases: {
        [PhaseName.Game]: {
            actions: {},
            next: PhaseName.Game,
        },
    },
} as const
