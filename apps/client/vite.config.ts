import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [react()],
    server: {
        host: "0.0.0.0",
        port: 3000,
        open: false,
        allowedHosts: ["localhost", "127.0.0.1", "0.0.0.0"],
        watch: {
            usePolling: true,
            interval: 1000,
        },
    },
    build: {
        outDir: "dist",
        sourcemap: true,
    },
    optimizeDeps: {
        exclude: ["@volley/vgf"],
    },
})
