import { InteractionType } from "@turkey-escape/server"
import type { ReactNode } from "react"

import { AsyncIcon } from "../components/icons/interactions/AsyncIcon"
import { DurableTimerIcon } from "../components/icons/interactions/DurableTimerIcon"
import { RaceIcon } from "../components/icons/interactions/RaceIcon"
import { TurnBasedIcon } from "../components/icons/interactions/TurnBasedIcon"

interface InteractionOption {
    id: InteractionType
    title: string
    description: string
    icon: ReactNode
}

export const interactionOptions: Record<InteractionType, InteractionOption> = {
    [InteractionType.TurnBased]: {
        id: InteractionType.TurnBased,
        title: "Turn Based",
        description: "Round robin style - each player takes a turn.",
        icon: TurnBasedIcon(),
    },
    [InteractionType.Race]: {
        id: InteractionType.Race,
        title: "Race",
        description:
            "First to buzz in wins! Limited time before auto-continue.",
        icon: RaceIcon(),
    },
    [InteractionType.Async]: {
        id: InteractionType.Async,
        title: "Async",
        description:
            "All players submit answers simultaneously. Ends when time runs out or everyone submits.",
        icon: AsyncIcon(),
    },
    [InteractionType.DurableTimer]: {
        id: InteractionType.DurableTimer,
        title: "Durable Timer",
        description:
            "Scheduler-backed countdown that persists across failover.",
        icon: DurableTimerIcon(),
    },
}
