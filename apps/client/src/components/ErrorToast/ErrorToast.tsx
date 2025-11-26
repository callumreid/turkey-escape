import type { ReactNode } from "react"
import { useEffect, useRef, useState } from "react"

import { CloseIcon } from "../icons/misc/CloseIcon"
import { DeniedIcon } from "../icons/misc/DeniedIcon"
import styles from "./ErrorToast.module.scss"

interface ErrorToastProps {
    title?: string
    message: string
    duration?: number
    onClose: () => void
}

export const ErrorToast = ({
    title = "Connection Error",
    message,
    duration = 5000,
    onClose,
}: ErrorToastProps): ReactNode => {
    const [progress, setProgress] = useState(100)
    const [isClosing, setIsClosing] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout>(undefined)
    const timeoutRef = useRef<NodeJS.Timeout>(undefined)

    useEffect(() => {
        const interval = 100
        const decrement = (interval / duration) * 100

        intervalRef.current = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev - decrement
                if (newProgress <= 0) {
                    handleClose()
                    return 0
                }
                return newProgress
            })
        }, interval)

        return (): void => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [duration])

    const handleClose = (): void => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
        setIsClosing(true)
        timeoutRef.current = setTimeout(onClose, 200)
    }

    const handleOverlayClick = (event: React.MouseEvent): void => {
        if (event.target === event.currentTarget) {
            handleClose()
        }
    }

    return (
        <div
            className={`${styles.overlay} ${isClosing ? styles.fadeOut : ""}`}
            onClick={handleOverlayClick}
        >
            <div className={styles.container}>
                <button
                    className={styles.closeButton}
                    onClick={handleClose}
                    type="button"
                    aria-label="Close error notification"
                >
                    <CloseIcon />
                </button>

                <div className={styles.icon}>
                    <DeniedIcon />
                </div>

                <h2 className={styles.title}>{title}</h2>
                <p className={styles.message}>{message}</p>

                <div
                    className={styles.progressBar}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    )
}
