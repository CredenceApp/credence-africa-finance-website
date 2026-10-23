import Reveal from "./Reveal"

const base = "/product-shots/"

type Props = {
  desktop?: [file: string, w: number, h: number]
  mobile?: [file: string, w: number, h: number]
  alt: string
  delay?: number
  className?: string
  imgClassName?: string
}

export default function ProductShot({ desktop, mobile, alt, delay = 0, className = "", imgClassName = "" }: Props) {
  const main = desktop ?? mobile!
  return (
    <Reveal delay={delay} className={className}>
      <picture>
        {desktop && mobile && <source media="(max-width: 767px)" srcSet={base + mobile[0]} width={mobile[1]} height={mobile[2]} />}
        <img
          src={base + main[0]}
          width={main[1]}
          height={main[2]}
          alt={alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={`block h-auto w-full select-none ${imgClassName}`}
        />
      </picture>
    </Reveal>
  )
}

export const ShotNote = ({ className = "" }: { className?: string }) => (
  <p className={`text-xs text-near-black/50 ${className}`}>Product interface shown with representative transaction data.</p>
)
