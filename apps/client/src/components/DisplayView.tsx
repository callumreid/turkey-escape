import { PhaseName } from "@turkey-escape/server"
import { useVGFClient } from "@volley/vgf/client"
import { type ReactNode, useEffect } from "react"

import { usePhase } from "../hooks/VGF"
import { GameDisplayView } from "./Game/GameDisplayView"
import { Loading } from "./Loading/Loading"

export const DisplayView = (): ReactNode => {
    const client = useVGFClient()

    const phase = usePhase()

    useEffect(() => {
        void client.connect()
    }, [])

    switch (phase) {
        case PhaseName.Game:
            return <GameDisplayView />
        default:
            return <Loading />
    }
}
