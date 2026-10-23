import { useEffect, useRef } from "react"

type TurnstileApi = {
  ready: (callback: () => void) => void
  render: (container: HTMLElement, options: Record<string, unknown>) => string
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

let scriptPromise: Promise<void> | null = null

const loadTurnstile = (): Promise<void> => {
  if (window.turnstile) return Promise.resolve()
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-credence-turnstile]')
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true })
      existing.addEventListener("error", () => reject(new Error("Unable to load verification")), { once: true })
      return
    }

    const script = document.createElement("script")
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
    script.defer = true
    script.dataset.credenceTurnstile = "true"
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Unable to load verification"))
    document.head.appendChild(script)
  })

  return scriptPromise
}

export default function Turnstile({
  siteKey,
  action,
  onToken,
  resetKey,
}: {
  siteKey: string
  action: "contact_form" | "report_download"
  onToken: (token: string) => void
  resetKey?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const callbackRef = useRef(onToken)
  callbackRef.current = onToken

  useEffect(() => {
    if (!siteKey || !containerRef.current) return
    let cancelled = false
    let widgetId: string | undefined

    loadTurnstile()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return
        widgetId = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action,
          theme: "light",
          size: "flexible",
          appearance: "interaction-only",
          callback: (token: string) => callbackRef.current(token),
          "expired-callback": () => callbackRef.current(""),
          "error-callback": () => callbackRef.current(""),
        })
      })
      .catch(() => callbackRef.current(""))

    return () => {
      cancelled = true
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId)
    }
  }, [action, resetKey, siteKey])

  if (!siteKey) {
    return <p className="text-sm text-near-black/60">Verification is not configured. Please contact support.</p>
  }

  return <div ref={containerRef} className="min-h-[65px] w-full" aria-label="Bot verification" />
}
