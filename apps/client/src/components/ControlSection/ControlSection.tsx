import type { ReactNode } from "react"

import { Button } from "../Button/Button"
import styles from "./ControlSection.module.scss"

type ControlSectionProps = {
    endButtonText: string
    handleEnd: () => void
}

export const ControlSection = ({
    endButtonText,
    handleEnd,
}: ControlSectionProps): ReactNode => {
    return (
        <div className={styles.controlSection}>
            <Button onClick={handleEnd} variant="secondary" fullWidth>
                {endButtonText}
            </Button>
        </div>
    )
}
