const PLAYER_NAME_KEY_PREFIX = "vgf-player-name"
const PLAYER_AVATAR_KEY_PREFIX = "vgf-player-avatar"
const PLAYER_SESSION_KEY_PREFIX = "vgf-player-session"

export const getPlayerNameKey = (userId: string): string =>
    `${PLAYER_NAME_KEY_PREFIX}-${userId}`

export const getPlayerAvatarKey = (userId: string): string =>
    `${PLAYER_AVATAR_KEY_PREFIX}-${userId}`

export const getPlayerSessionKey = (userId: string): string =>
    `${PLAYER_SESSION_KEY_PREFIX}-${userId}`
