import type { ReactNode } from "react"
import { type KeyboardEvent } from "react"

import styles from "./Input.module.scss"

interface InputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    type?: "text" | "email" | "password"
    fullWidth?: boolean
    onSubmit?: () => void
}

export const Input = ({
    value,
    onChange,
    placeholder,
    type = "text",
    fullWidth = false,
    onSubmit,
}: InputProps): ReactNode => {
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter" && onSubmit) {
            onSubmit()
        }

        if (
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight" ||
            e.key === "ArrowUp" ||
            e.key === "ArrowDown"
        ) {
            e.stopPropagation()
        }
    }

    return (
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`${styles.input} ${fullWidth ? styles.fullWidth : ""}`}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            data-1p-ignore="true"
            data-lpignore="true"
            data-form-type="other"
        />
    )
}
