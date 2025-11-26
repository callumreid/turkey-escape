import { baseConfig } from "eslint-config/base"

/** @type {import("eslint").Linter.Config[]} */
export default [
    ...baseConfig,
    {
        languageOptions: {
            parserOptions: {
                project: ["./tsconfig.json"],
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        ignores: ["dist/**", "coverage/**"],
    },
    {
        rules: {
            "@typescript-eslint/no-misused-promises": "off",
        },
    },
]
