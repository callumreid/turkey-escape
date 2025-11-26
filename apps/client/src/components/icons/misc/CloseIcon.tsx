import type { ReactNode } from "react"

export const CloseIcon = (): ReactNode => {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
        </svg>
    )
}
