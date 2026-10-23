import type { ReactNode } from "react"
import { useInView } from "../hooks"

export default function Photo({
  src,
  alt,
  className = "",
  position = "center",
  shade = "from-near-black/85 via-near-black/25 to-near-black/10",
  priority = false,
  children,
}: {
  src: string
  alt: string
  className?: string
  position?: string
  shade?: string
  priority?: boolean
  children?: ReactNode
}) {
  const srcSet = src.includes("images.unsplash.com")
    ? [480, 800, 1200, 1800].map((w) => `${src.replace(/([?&])w=\d+/, `$1w=${w}`).replace(/&h=\d+/, "")} ${w}w`).join(", ")
    : undefined
  const [ref, seen] = useInView<HTMLDivElement>(0.05)
  return (
    <div ref={ref} data-photo className={`relative isolate overflow-hidden bg-charcoal ${className}`}>
      <img
        src={src}
        alt={alt}
        srcSet={srcSet}
        sizes="100vw"
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className="absolute inset-0 -z-10 size-full object-cover"
        style={{
          objectPosition: position,
          transform: seen ? "scale(1)" : "scale(1.08)",
          transition: "transform 2200ms cubic-bezier(0.65,0,0.35,1)",
          filter: "saturate(0.62) contrast(1.12) brightness(0.88) sepia(0.14)",
        }}
      />
      <div className={`absolute inset-0 -z-10 bg-gradient-to-t ${shade}`} />
      {children}
    </div>
  )
}
