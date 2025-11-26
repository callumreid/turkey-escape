import { getUserIdFromQueryParams } from "@volley/vgf/client"
import { v4 } from "uuid"

const USER_ID_KEY = "vgf-user-id"

export const getUserId = (): string => {
    try {
        return getUserIdFromQueryParams()
    } catch {
        const existingUserId = localStorage.getItem(USER_ID_KEY)

        if (existingUserId) return existingUserId

        const newUserId = v4()

        localStorage.setItem(USER_ID_KEY, newUserId)

        return newUserId
    }
}
