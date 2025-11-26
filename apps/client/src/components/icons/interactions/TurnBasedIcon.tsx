import type { ReactNode } from "react"

export const TurnBasedIcon = (): ReactNode => {
    return (
        <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v6M12 17v6M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h6M17 12h6M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
    )
}
