const getServerFromQuery = (): string | null => {
    try {
        const sp = new URLSearchParams(window.location.search)
        return sp.get("server")
    } catch {
        return null
    }
}

export const BACKEND_SERVER_ENDPOINT =
    import.meta.env.VITE_BACKEND_SERVER_ENDPOINT ||
    getServerFromQuery() ||
    "http://localhost:3001"

export const LOG_LEVEL = import.meta.env.VITE_LOG_LEVEL || "info"
