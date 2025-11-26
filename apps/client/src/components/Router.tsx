import { ClientType, getClientTypeFromQueryParams } from "@volley/vgf/client"
import { type ReactNode } from "react"

import { ConnectionStatusIndicator } from "./ConnectionStatusIndicator/ConnectionStatusIndicator"
import { ControllerView } from "./ControllerView"
import { DisplayView } from "./DisplayView"

export const Router = (): ReactNode => {
    const clientType = getClientTypeFromQueryParams()

    // const dispatch = useDispatch()
    // const vgfClient = useVGFClient()

    // useEffect(() => {
    //     dispatch("SET_GAME_MODE", GameMode.PartyMode)
    // }, [vgfClient])

    return (
        <>
            <ConnectionStatusIndicator />
            {clientType === ClientType.Display ? (
                <DisplayView />
            ) : (
                <ControllerView />
            )}
        </>
    )
}
