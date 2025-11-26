import type { SessionMember } from "@volley/vgf/types"

export const getSessionMemberName = (sessionMember?: SessionMember): string => {
    if (!sessionMember) return "Anonymous"

    return sessionMember.state.name || "Anonymous"
}
