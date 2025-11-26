import { getSessionIdFromQueryParams, useVGFClient } from "@volley/vgf/client"
import type { ReactNode } from "react"

import { AvatarOption, avatarOptions } from "../../constants/avatarOptions"
import {
    getPlayerAvatarKey,
    getPlayerNameKey,
    getPlayerSessionKey,
} from "../../constants/localStorage"
import { useStateFromLocalStorage } from "../../hooks/useStateFromLocalStorage"
import { getUserId } from "../../util/getUserId"
import { Button } from "../Button/Button"
import { CheckmarkIcon } from "../icons/misc/CheckmarkIcon"
import { Input } from "../Input/Input"
import styles from "./Join.module.scss"

export const Join = (): ReactNode => {
    const vgfClient = useVGFClient()
    const userId = getUserId()
    const sessionId = getSessionIdFromQueryParams()

    const [playerName, setPlayerName] = useStateFromLocalStorage<string>(
        getPlayerNameKey(userId),
        ""
    )
    const [selectedAvatar, setSelectedAvatar] =
        useStateFromLocalStorage<AvatarOption>(
            getPlayerAvatarKey(userId),
            AvatarOption.Person
        )

    const handleContinue = (): void => {
        if (!playerName.trim()) return

        localStorage.setItem(getPlayerSessionKey(userId), sessionId)

        vgfClient.connect({
            name: playerName.trim(),
            avatarUrl: selectedAvatar,
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <img className={styles.logo} src="vgf-sticker.png" alt="VGF" />
                <div className={styles.formContainer}>
                    <Input
                        value={playerName}
                        onChange={setPlayerName}
                        onSubmit={handleContinue}
                        placeholder="Enter your name"
                        fullWidth
                    />
                    <div className={styles.avatarSelector}>
                        <span className={styles.avatarLabel}>
                            Choose your avatar:
                        </span>
                        <div className={styles.avatarOptions}>
                            {Object.values(avatarOptions).map((avatar) => (
                                <button
                                    key={avatar.id}
                                    className={`${styles.avatarOption} ${
                                        selectedAvatar === avatar.id
                                            ? styles.selected
                                            : ""
                                    }`}
                                    onClick={() => setSelectedAvatar(avatar.id)}
                                    type="button"
                                >
                                    {avatar.icon}
                                </button>
                            ))}
                        </div>
                    </div>
                    <Button
                        onClick={handleContinue}
                        disabled={!playerName.trim()}
                        fullWidth
                        autoFocus
                        icon={<CheckmarkIcon />}
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}
