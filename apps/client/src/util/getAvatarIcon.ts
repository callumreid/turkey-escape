import type { ReactNode } from "react"

import { AvatarOption, avatarOptions } from "../constants/avatarOptions"

export const getAvatarIcon = (avatarUrl?: string): ReactNode => {
    if (!avatarUrl) {
        return avatarOptions[AvatarOption.Person]!.icon
    }

    const avatar = avatarOptions[avatarUrl]

    if (!avatar) {
        return avatarOptions[AvatarOption.Person]!.icon
    }

    return avatar.icon
}
