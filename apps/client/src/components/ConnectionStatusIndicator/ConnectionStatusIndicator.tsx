import { ConnectionStatus, useConnectionStatus } from "@volley/vgf/client"
import { type ReactNode } from "react"

import styles from "./ConnectionStatusIndicator.module.scss"

export const ConnectionStatusIndicator = (): ReactNode => {
    const connectionStatus = useConnectionStatus()

    const isConnected = connectionStatus === ConnectionStatus.Connected

    return (
        <div
            className={`${styles.indicator} ${
                isConnected ? styles.connected : styles.disconnected
            }`}
            title={isConnected ? "Connected" : "Disconnected"}
        />
    )
}
