import { type ChildProcess, spawn } from "node:child_process"

import { build, type BuildOptions, context, type Plugin } from "esbuild"

import { logger } from "./src/logger"

const isWatchMode = process.argv.includes("--watch")

let serverProcess: ChildProcess | null = null

const startServerPlugin: Plugin = {
    name: "start-server",
    setup(build) {
        build.onEnd(async () => {
            if (serverProcess) {
                serverProcess.kill("SIGTERM")
                await new Promise((resolve) => {
                    serverProcess?.once("exit", resolve)
                    setTimeout(resolve, 1000)
                })
            }

            serverProcess = spawn(
                "node",
                [
                    "--inspect=0.0.0.0:9229",
                    "--enable-source-maps",
                    "./dist/index.js",
                ],
                {
                    stdio: "inherit",
                    env: process.env,
                }
            )

            serverProcess.on("exit", (code) => {
                if (code !== null && code !== 0) {
                    logger.error(`Server process exited with code ${code}`)
                }
            })
        })
    },
}

async function buildProject(): Promise<void> {
    const buildOptions: BuildOptions = {
        entryPoints: ["./src/index.ts"],
        outdir: "dist",
        platform: "node",
        format: "esm",
        target: "node22",
        sourcemap: isWatchMode ? "inline" : false,
        outExtension: { ".js": ".js" },
        bundle: true,
        minify: isWatchMode ? false : true,
        keepNames: true,
        logLevel: "info",
        packages: "external",
    }

    if (isWatchMode) {
        const ctx = await context({
            ...buildOptions,
            plugins: [startServerPlugin],
        })
        await ctx.watch()

        const cleanup = async (): Promise<void> => {
            if (serverProcess) {
                serverProcess.kill("SIGTERM")
            }
            await ctx.dispose()
            process.exit(0)
        }

        process.on("SIGINT", cleanup)
        process.on("SIGTERM", cleanup)
    } else {
        await build(buildOptions)
    }
}

void buildProject()
