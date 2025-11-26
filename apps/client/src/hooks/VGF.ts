import { getVGFHooks } from "@volley/vgf/client"

// NOTE: We use 'any' here to bypass strict type checking for now as we are iterating fast.
// In a production app, we should use the generated types from the server.
const hooks = getVGFHooks<any, any, any>()

export const useStateSyncSelector = hooks.useStateSyncSelector
export const usePhase = hooks.usePhase
export const useSessionMembers = hooks.useSessionMembers
export const useDispatchAction = hooks.useDispatchAction
export const useDispatchThunk = hooks.useDispatchThunk
export const useDispatch = hooks.useDispatch
export const useEvents = hooks.useEvents

export const useGameState = useStateSyncSelector
