import { useEffect, type ReactNode } from "react"
import Logo from "../components/Logo"
import { rememberAudience, type Audience } from "../links"

const copy: Record<Audience | "neutral", { kicker: string; title: string; body: string; points: string[] }> = {
  merchant: {
    kicker: "Merchants",
    title: "Your trade deserves the right structure.",
    body: "Bring your trade opportunities into a platform built for clarity, coordination and execution.",
    points: ["Structured trade opportunities", "Verified business onboarding", "Visibility throughout execution"],
  },
  financier: {
    kicker: "Financiers",
    title: "Bring greater clarity to capital deployment.",
    body: "Discover structured trade opportunities supported by transaction information, monitoring and execution oversight.",
    points: ["Structured opportunities", "Transaction and counterparty intelligence", "Visibility from origination to settlement"],
  },
  neutral: {
    kicker: "Credence",
    title: "Trade finance infrastructure for African real economy trade.",
    body: "One account type for each side of the transaction.",
    points: [],
  },
}

function Path({ audience }: { audience?: Audience }) {
  const n = 7
  const x = (i: number) => 8 + (i * 384) / (n - 1)
  return (
    <svg viewBox="0 0 400 24" className="w-full max-w-[26rem]" fill="none" aria-hidden>
      <line x1="8" y1="12" x2="392" y2="12" stroke="rgba(255,255,255,0.25)" />
      {Array.from({ length: n }).map((_, i) => {
        const cap = audience !== "merchant" && i === 3
        const lead = audience !== "financier" && i === 0
        return <circle key={i} cx={x(i)} cy="12" r={cap || lead ? 5 : 4} fill={cap ? "#f08921" : lead ? "#fff" : "#0e2420"} stroke={cap ? "#f08921" : "rgba(255,255,255,0.7)"} />
      })}
    </svg>
  )
}

export default function AuthShell({ audience, title, intro, children }: { audience?: Audience; title: string; intro?: string; children: ReactNode }) {
  const c = copy[audience ?? "neutral"]
  useEffect(() => rememberAudience(audience), [audience])
  return (
    <div className="min-h-svh bg-warm-white text-near-black lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <aside className="bg-midnight text-white lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-between">
        <div className="wrap flex h-16 items-center justify-between lg:h-auto lg:max-w-none lg:px-12 lg:pt-10 xl:px-16">
          <a href="#/" aria-label="Credence home">
            <Logo />
          </a>
          <a href="#/" className="flex min-h-11 items-center text-sm text-white/65 transition-colors hover:text-white lg:hidden">
            Back to website
          </a>
        </div>
        <div className="hidden px-12 xl:px-16 lg:block">
          <p className="eyebrow flex items-center gap-3 text-white/60">
            {audience === "financier" && <span className="size-1.5 rounded-full bg-orange" aria-hidden />}
            {c.kicker}
          </p>
          <p className="mt-6 max-w-[28rem] font-display text-[clamp(2rem,3vw,3rem)] leading-[1.05] tracking-[-0.035em]">{c.title}</p>
          <p className="mt-6 max-w-[26rem] text-[15px] leading-relaxed text-white/60">{c.body}</p>
          {c.points.length > 0 && (
            <ul className="mt-10 max-w-[26rem] divide-y divide-white/10 border-y border-white/10 text-[15px] text-white/80">
              {c.points.map((p) => (
                <li key={p} className="flex items-center gap-3 py-3">
                  <span className={`size-1.5 shrink-0 rounded-full ${audience === "financier" ? "bg-orange" : "bg-white/60"}`} aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-10">
            <Path audience={audience} />
          </div>
        </div>
        <div className="hidden px-12 pb-10 xl:px-16 lg:block">
          <a href="#/" className="text-sm text-white/65 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white">
            Back to the Credence website
          </a>
        </div>
      </aside>

      <main className="min-w-0">
        <div className="mx-auto flex w-full max-w-[34rem] flex-col justify-center px-5 py-10 sm:px-8 md:py-14 lg:min-h-svh lg:py-16">
          {audience && (
            <p className="eyebrow flex items-center gap-3 text-near-black/60">
              {audience === "financier" && <span className="size-1.5 rounded-full bg-orange" aria-hidden />}
              {audience === "financier" ? "Financier" : "Merchant"}
            </p>
          )}
          <h1 className={`${audience ? "mt-4" : ""} font-display text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.05] tracking-[-0.04em]`}>{title}</h1>
          {intro && <p className="mt-4 max-w-[28rem] text-[15px] leading-relaxed text-near-black/65">{intro}</p>}
          <div className="mt-8 min-w-0">{children}</div>
        </div>
      </main>
    </div>
  )
}
