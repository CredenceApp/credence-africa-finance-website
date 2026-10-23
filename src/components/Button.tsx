import type { ComponentProps } from "react"

type Variant = "primary" | "light" | "outline" | "outline-dark" | "text" | "accent"

const variants: Record<Variant, string> = {
  primary: "bg-green text-white hover:bg-deep-green border border-green hover:border-deep-green",
  light: "bg-warm-white text-near-black hover:bg-white border border-warm-white",
  outline: "border border-near-black/25 text-near-black hover:border-near-black",
  "outline-dark": "border border-white/25 text-white hover:border-white/70",
  text: "text-current border border-transparent hover:opacity-70",
  accent: "bg-orange text-near-black hover:brightness-110 border border-orange",
}

export const buttonClasses = (variant: Variant = "primary", className = "") =>
  `inline-flex min-h-11 items-center justify-center gap-2 rounded-ui px-5 text-sm font-normal tracking-tight whitespace-nowrap transition-colors duration-200 ${variants[variant]} ${className}`

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button
      {...props}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-ui px-5 text-sm font-normal tracking-tight whitespace-nowrap transition-colors duration-200 ${variants[variant]} ${className}`}
    />
  )
}
