import type { ReactNode } from "react"
import { EASE, useInView } from "../hooks"

export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const [ref, seen] = useInView<HTMLDivElement>(0.15)
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${seen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} ${className}`}
      style={{ transitionDelay: `${delay}ms`, transitionTimingFunction: EASE }}
    >
      {children}
    </div>
  )
}
