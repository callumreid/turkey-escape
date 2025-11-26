import type { ReactNode } from "react"

import { HeartAvatarIcon } from "../components/icons/avatars/HeartAvatarIcon"
import { StarAvatarIcon } from "../components/icons/avatars/StarAvatarIcon"
import { LightningBoltIcon } from "../components/icons/misc/LightningBoltIcon"
import { ShieldIcon } from "../components/icons/misc/ShieldIcon"

export enum ActionOption {
    Heart = "HEART",
    Star = "STAR",
    Lightning = "LIGHTNING",
    Shield = "SHIELD",
}

export const actionOptions: Record<
    string,
    { id: ActionOption; icon: ReactNode }
> = {
    [ActionOption.Heart as string]: {
        id: ActionOption.Heart,
        icon: HeartAvatarIcon(),
    },
    [ActionOption.Star as string]: {
        id: ActionOption.Star,
        icon: StarAvatarIcon(),
    },
    [ActionOption.Lightning as string]: {
        id: ActionOption.Lightning,
        icon: LightningBoltIcon(),
    },
    [ActionOption.Shield as string]: {
        id: ActionOption.Shield,
        icon: ShieldIcon(),
    },
}
