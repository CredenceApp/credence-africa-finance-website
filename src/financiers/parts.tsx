import type { ReactNode } from "react"
import Reveal from "../components/Reveal"

export function Head({
  eyebrow,
  title,
  copy,
  dark = false,
  className = "",
}: {
  eyebrow: string
  title: ReactNode
  copy?: string
  dark?: boolean
  className?: string
}) {
  return (
    <div className={`max-w-[52rem] ${className}`}>
      <Reveal>
        <p className={`eyebrow ${dark ? "text-white/55" : "text-near-black/55"}`}>{eyebrow}</p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="display-section mt-5">{title}</h2>
      </Reveal>
      {copy && (
        <Reveal delay={160}>
          <p className={`mt-7 max-w-[38rem] text-base leading-relaxed md:text-[17px] ${dark ? "text-white/65" : "text-near-black/65"}`}>{copy}</p>
        </Reveal>
      )}
    </div>
  )
}
