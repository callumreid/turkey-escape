import type { ReactNode } from "react"
import { createContext, useContext, useState } from "react"

import { ErrorToast } from "./ErrorToast"

interface ErrorNotification {
    id: string
    title?: string
    message: string
    duration?: number
}

interface ErrorContextValue {
    showError: (
        message: string,
        options?: { title?: string; duration?: number }
    ) => void
    hideError: (id: string) => void
}

const ErrorContext = createContext<ErrorContextValue | null>(null)

interface ErrorProviderProps {
    children: ReactNode
}

export const ErrorProvider = ({ children }: ErrorProviderProps): ReactNode => {
    const [errors, setErrors] = useState<ErrorNotification[]>([])

    const showError = (
        message: string,
        options: { title?: string; duration?: number } = {}
    ): void => {
        const id = Math.random().toString(36).substring(2, 9)
        const newError: ErrorNotification = {
            id,
            message,
            title: options.title,
            duration: options.duration,
        }

        setErrors((prev) => [...prev, newError])
    }

    const hideError = (id: string): void => {
        setErrors((prev) => prev.filter((error) => error.id !== id))
    }

    return (
        <ErrorContext.Provider value={{ showError, hideError }}>
            {children}
            {errors.map((error) => (
                <ErrorToast
                    key={error.id}
                    title={error.title}
                    message={error.message}
                    duration={error.duration}
                    onClose={() => hideError(error.id)}
                />
            ))}
        </ErrorContext.Provider>
    )
}

export const useError = (): ErrorContextValue => {
    const context = useContext(ErrorContext)
    if (!context) {
        throw new Error("useError must be used within an ErrorProvider")
    }
    return context
}
