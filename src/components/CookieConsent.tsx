import { useEffect, useRef, useState } from "react"
import { acceptAll, rejectNonEssential, openPreferences, closePreferences, saveConsent, usePanel, useConsent } from "../consent"
import Button from "./Button"

const cats = [
  { key: "necessary", t: "Strictly necessary", d: "Required for security, session management, authentication, fraud prevention and core functionality." },
  { key: "functional", t: "Functional / preference", d: "Used to remember settings and preferences." },
  { key: "analytics", t: "Analytics / performance", d: "Used to understand usage, errors, device/browser information and improve performance." },
] as const

function Toggle({ on, locked, label, onChange }: { on: boolean; locked?: boolean; label: string; onChange?: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      disabled={locked}
      onClick={() => onChange?.(!on)}
      className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors ${on ? "border-green bg-green" : "border-near-black/30 bg-transparent"} ${locked ? "cursor-not-allowed opacity-60" : ""}`}
    >
      <span className={`absolute top-0.5 size-4 rounded-full transition-all ${on ? "left-[22px] bg-white" : "left-0.5 bg-near-black/50"}`} />
    </button>
  )
}

function Preferences() {
  const current = useConsent()
  const [sel, setSel] = useState({ functional: current?.functional ?? false, analytics: current?.analytics ?? false })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    ref.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closePreferences()
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      prev?.focus?.()
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[90] flex justify-end bg-near-black/60" onClick={closePreferences}>
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cp-title"
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-[30rem] flex-col bg-warm-white text-near-black outline-none"
        style={{ animation: "rise .5s cubic-bezier(0.65,0,0.35,1) both" }}
      >
        <div className="flex items-start justify-between gap-6 border-b border-near-black/15 px-6 py-6 md:px-8">
          <div>
            <p className="eyebrow text-near-black/55">Cookie preferences</p>
            <h2 id="cp-title" className="mt-2 font-display text-2xl tracking-[-0.02em]">Manage your preferences</h2>
          </div>
          <button onClick={closePreferences} aria-label="Close cookie preferences" className="-mr-2 flex size-11 items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.2" /></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 md:px-8">
          <p className="py-6 text-sm leading-relaxed text-near-black/65">
            Non-essential categories are off unless you turn them on. You can change your choice at any time from the footer. See our{" "}
            <a href="#/cookies" onClick={closePreferences} className="underline underline-offset-4">Cookies Policy</a>.
          </p>
          <ul className="border-t border-near-black">
            {cats.map((c) => (
              <li key={c.key} className="flex items-start justify-between gap-6 border-b border-near-black/15 py-6">
                <div>
                  <h3 className="font-display text-lg tracking-[-0.01em]">{c.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-near-black/65">{c.d}</p>
                  {c.key === "necessary" && <p className="eyebrow mt-3 text-xs text-near-black/55">Always active</p>}
                </div>
                {c.key === "necessary" ? (
                  <Toggle on locked label={`${c.t}, always active`} />
                ) : (
                  <Toggle on={sel[c.key]} label={c.t} onChange={(v) => setSel((s) => ({ ...s, [c.key]: v }))} />
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3 border-t border-near-black/15 px-6 py-6 md:px-8">
          <Button variant="primary" onClick={() => saveConsent(sel)}>Save preferences</Button>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={acceptAll}>Accept all</Button>
            <Button variant="outline" onClick={rejectNonEssential}>Reject non-essential</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CookieConsent() {
  const panel = usePanel()
  if (panel === "preferences") return <Preferences />
  if (panel === "banner")
    return (
      <div
        role="region"
        aria-label="Cookie consent"
        className="fixed inset-x-0 bottom-0 z-[80] max-h-[85svh] overflow-y-auto border-t border-white/15 bg-near-black text-white"
        style={{ animation: "rise .7s cubic-bezier(0.65,0,0.35,1) both" }}
      >
        <div className="wrap flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between md:gap-12 md:py-6">
          <div className="max-w-[40rem]">
            <p className="font-display text-lg tracking-[-0.02em]">Cookies at Credence</p>
            <p className="mt-1 text-[13px] leading-relaxed text-white/65 md:text-sm">
              We use necessary cookies to operate and secure our Services. With your permission, we also use preference and analytics cookies to improve your experience.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3">
            <Button variant="light" onClick={acceptAll}>Accept all</Button>
            <Button variant="outline-dark" onClick={rejectNonEssential}>Reject non-essential</Button>
            <Button variant="outline-dark" onClick={openPreferences}>Manage preferences</Button>
          </div>
        </div>
      </div>
    )
  return null
}
