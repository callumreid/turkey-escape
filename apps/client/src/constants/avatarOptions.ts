import type { ReactNode } from "react"

import { HeartAvatarIcon } from "../components/icons/avatars/HeartAvatarIcon"
import { PersonAvatarIcon } from "../components/icons/avatars/PersonAvatarIcon"
import { SmileAvatarIcon } from "../components/icons/avatars/SmileAvatarIcon"
import { StarAvatarIcon } from "../components/icons/avatars/StarAvatarIcon"

export enum AvatarOption {
    Person = "PERSON",
    Smile = "SMILE",
    Star = "STAR",
    Heart = "HEART",
}

export const avatarOptions: Record<
    string,
    { id: AvatarOption; icon: ReactNode }
> = {
    [AvatarOption.Person as string]: {
        id: AvatarOption.Person,
        icon: PersonAvatarIcon(),
    },
    [AvatarOption.Smile as string]: {
        id: AvatarOption.Smile,
        icon: SmileAvatarIcon(),
    },
    [AvatarOption.Star as string]: {
        id: AvatarOption.Star,
        icon: StarAvatarIcon(),
    },
    [AvatarOption.Heart as string]: {
        id: AvatarOption.Heart,
        icon: HeartAvatarIcon(),
    },
}
