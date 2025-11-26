import type { ReactNode } from "react"

import styles from "./StatusCard.module.scss"

type StatusCardProps = {
    title: string
    description: string
    icon: ReactNode
    className?: string
}

export const StatusCard = ({
    title,
    description,
    icon,
    className,
}: StatusCardProps): ReactNode => {
    return (
        <div className={`${styles.statusCard} ${className}`}>
            <div className={styles.statusIcon}>{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    )
}
