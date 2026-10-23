import { useSyncExternalStore } from "react"

export type Consent = { functional: boolean; analytics: boolean; savedAt: string }

const KEY = "credence-cookie-consent"
const listeners = new Set<() => void>()
let panel: "closed" | "banner" | "preferences" = "closed"

const read = (): Consent | null => {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "null")
    if (v && typeof v.functional === "boolean" && typeof v.analytics === "boolean") return v
  } catch {
    /* storage unavailable or malformed */
  }
  return null
}

let consent: Consent | null = typeof window === "undefined" ? null : read()
panel = consent ? "closed" : "banner"

const emit = () => listeners.forEach((l) => l())
const subscribe = (l: () => void) => {
  listeners.add(l)
  return () => listeners.delete(l)
}

export const saveConsent = (c: { functional: boolean; analytics: boolean }) => {
  consent = { ...c, savedAt: new Date().toISOString() }
  try {
    localStorage.setItem(KEY, JSON.stringify(consent))
  } catch {
    /* storage unavailable: consent holds for this session only */
  }
  panel = "closed"
  emit()
}
export const acceptAll = () => saveConsent({ functional: true, analytics: true })
export const rejectNonEssential = () => saveConsent({ functional: false, analytics: false })
export const openPreferences = () => {
  panel = "preferences"
  emit()
}
export const closePreferences = () => {
  panel = consent ? "closed" : "banner"
  emit()
}

export const usePanel = () => useSyncExternalStore(subscribe, () => panel)
export const useConsent = () => useSyncExternalStore(subscribe, () => consent)
