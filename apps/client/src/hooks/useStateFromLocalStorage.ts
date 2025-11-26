import { useCallback, useEffect, useState } from "react"

export const useStateFromLocalStorage = <T>(
    key: string,
    defaultValue: T
): [T, (value: T) => void] => {
    const [state, setState] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key)
            return item ? (JSON.parse(item) as T) : defaultValue
        } catch {
            return defaultValue
        }
    })

    const setValue = useCallback(
        (value: T) => {
            try {
                setState(value)
                localStorage.setItem(key, JSON.stringify(value))
            } catch {
                return
            }
        },
        [key]
    )

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent): void => {
            if (e.key === key && e.newValue !== null) {
                try {
                    setState(JSON.parse(e.newValue) as T)
                } catch {
                    return
                }
            }
        }

        window.addEventListener("storage", handleStorageChange)

        return (): void => {
            window.removeEventListener("storage", handleStorageChange)
        }
    }, [key])

    return [state, setValue]
}
