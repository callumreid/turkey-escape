import { useFocusable } from "@noriginmedia/norigin-spatial-navigation"
import { type ReactNode, useEffect } from "react"

import styles from "./Button.module.scss"

interface ButtonProps {
    children: ReactNode
    onClick: () => void
    variant?: "primary" | "secondary"
    icon?: ReactNode
    disabled?: boolean
    fullWidth?: boolean
    className?: string
    autoFocus?: boolean
}

export const Button = ({
    children,
    onClick,
    variant = "primary",
    icon,
    disabled = false,
    fullWidth = false,
    className = "",
    autoFocus = false,
}: ButtonProps): ReactNode => {
    const { ref, focused, focusSelf } = useFocusable({
        onEnterPress: onClick,
        forceFocus: true,
    })

    useEffect(() => {
        if (autoFocus) {
            focusSelf()
        }
    }, [autoFocus, focusSelf])

    return (
        <button
            ref={ref}
            className={`${styles.button} ${styles[variant]} ${
                fullWidth ? styles.fullWidth : ""
            } ${focused ? styles.focused : ""} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            <span className={styles.text}>{children}</span>
        </button>
    )
}
