import type { ReactNode } from "react"

import styles from "./Loading.module.scss"

export const Loading = (): ReactNode => {
    return (
        <div className={styles.container}>
            <div className={styles.spinner} />
        </div>
    )
}
