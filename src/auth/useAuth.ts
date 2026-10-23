import { useCallback, useEffect, useState } from "react"
import { config } from "../config"
import type { Audience } from "../links"

export type AuthStatus = "idle" | "sending" | "ok" | "unavailable" | "conflict" | "rejected" | "invalid" | "expired" | "error"
export type Endpoint = keyof typeof config.auth.endpoints

const readQuery = () => new URLSearchParams(window.location.hash.split("?")[1] ?? "")

export function useHashQuery() {
  const [q, setQ] = useState(readQuery)
  useEffect(() => {
    const on = () => setQ(readQuery())
    window.addEventListener("hashchange", on)
    return () => window.removeEventListener("hashchange", on)
  }, [])
  return q
}

export const audienceOf = (v: string | null | undefined): Audience | undefined => (v === "merchant" || v === "financier" ? v : undefined)

export function useAuthRequest(endpoint: Endpoint) {
  const [status, setStatus] = useState<AuthStatus>("idle")
  const send = useCallback(
    async (payload: Record<string, string>): Promise<AuthStatus> => {
      const url = config.auth.endpoints[endpoint]
      if (!url) {
        setStatus("unavailable")
        return "unavailable"
      }
      setStatus("sending")
      let next: AuthStatus
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          credentials: "same-origin",
          body: JSON.stringify(payload),
        })
        next = res.ok ? "ok" : res.status === 409 ? "conflict" : res.status === 401 || res.status === 403 ? "rejected" : res.status === 410 ? "expired" : res.status === 400 || res.status === 422 ? "invalid" : "error"
      } catch {
        next = "error"
      }
      setStatus(next)
      return next
    },
    [endpoint],
  )
  return { status, send, reset: () => setStatus("idle") }
}
