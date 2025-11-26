import { useEffect } from "react"

import { useDispatchAction } from "../../hooks/VGF"

export const GameControllerView = () => {
    const dispatchAction = useDispatchAction()

    const handleMove = (direction: "up" | "down" | "left" | "right") => {
        console.log("Controller: Moving", direction)
        dispatchAction("move", { direction })
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowUp":
                    handleMove("up")
                    break
                case "ArrowDown":
                    handleMove("down")
                    break
                case "ArrowLeft":
                    handleMove("left")
                    break
                case "ArrowRight":
                    handleMove("right")
                    break
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [dispatchAction])

    const btnStyle = {
        width: "60px",
        height: "60px",
        fontSize: "24px",
        margin: "5px",
        borderRadius: "10px",
        border: "none",
        background: "#ff9800",
        color: "white",
        cursor: "pointer",
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                background: "#222",
                color: "white",
            }}
        >
            <h2>Controls</h2>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <button style={btnStyle} onClick={() => handleMove("up")}>
                    ⬆️
                </button>
                <div style={{ display: "flex" }}>
                    <button style={btnStyle} onClick={() => handleMove("left")}>
                        ⬅️
                    </button>
                    <button style={btnStyle} onClick={() => handleMove("down")}>
                        ⬇️
                    </button>
                    <button
                        style={btnStyle}
                        onClick={() => handleMove("right")}
                    >
                        ➡️
                    </button>
                </div>
            </div>
            <p>Use Arrow Keys or Buttons</p>
        </div>
    )
}
