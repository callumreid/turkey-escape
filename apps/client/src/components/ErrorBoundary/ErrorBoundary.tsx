import type { ErrorInfo, ReactNode } from "react"
import { Component } from "react"

import styles from "./ErrorBoundary.module.scss"

interface ErrorBoundaryState {
    hasError: boolean
    error: Error | null
    errorInfo: ErrorInfo | null
}

interface ErrorBoundaryProps {
    children: ReactNode
}

export class ErrorBoundary extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({
            error,
            errorInfo,
        })
    }

    public render(): ReactNode {
        if (this.state.hasError) {
            return (
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <div className={styles.content}>
                            <h1 className={styles.title}>
                                Something went wrong
                            </h1>
                            <p className={styles.message}>
                                <i>An unexpected error occurred.</i>
                            </p>
                            {this.state.error?.message && (
                                <div className={styles.errorMessage}>
                                    {this.state.error.message}
                                </div>
                            )}

                            <details className={styles.details}>
                                <summary className={styles.summary}>
                                    Stack Traces
                                </summary>
                                <div className={styles.errorContainer}>
                                    <div className={styles.errorColumn}>
                                        <h3 className={styles.errorTitle}>
                                            Error Stack
                                        </h3>
                                        <pre className={styles.error}>
                                            {this.state.error?.stack}
                                        </pre>
                                    </div>
                                    {this.state.errorInfo && (
                                        <div className={styles.errorColumn}>
                                            <h3 className={styles.errorTitle}>
                                                Component Stack
                                            </h3>
                                            <pre className={styles.error}>
                                                {
                                                    this.state.errorInfo
                                                        .componentStack
                                                }
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            )
        }

        return this.props.children
    }

    public static getDerivedStateFromError(
        error: Error
    ): Partial<ErrorBoundaryState> {
        return {
            hasError: true,
            error,
        }
    }
}
