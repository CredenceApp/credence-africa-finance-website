import { clamp, useViewProgress } from "../hooks"

const cols = 13
const fields = ["Sector", "Buyer", "Supplier", "Trade type", "Tenor", "Payment conditions"]

const jit = (i: number, k: number) => (((i * 41 + k * 17) % 23) / 23 - 0.5) * 2

export default function OrderBand() {
  const [ref, p] = useViewProgress<HTMLDivElement>()
  const a = clamp((p - 0.15) / 0.6)
  const done = clamp((a - 0.85) / 0.15)

  return (
    <div
      ref={ref}
      className="relative h-[70svh] min-h-[26rem] overflow-hidden"
      style={{ background: "linear-gradient(to bottom,#0b0e0d 50%,#ecede8 50%)" }}
      aria-hidden
    >
      <div className="wrap relative h-full">
        {Array.from({ length: cols }).map((_, i) => {
          const dx = jit(i, 1) * 90 * (1 - a)
          const rot = jit(i, 2) * 5 * (1 - a)
          return (
            <span
              key={i}
              className="absolute -top-10 -bottom-10 w-px"
              style={{
                left: `calc(${(i / (cols - 1)) * 100}% - ${(i / (cols - 1)) * 1}px)`,
                background: "linear-gradient(to bottom, rgba(255,255,255,0.28) 50%, rgba(11,14,13,0.2) 50%)",
                transform: `translateX(${dx}px) rotate(${rot}deg)`,
              }}
            />
          )
        })}

        <p className="absolute left-5 top-[38%] text-xs uppercase tracking-[0.18em] text-white/45 md:left-10" style={{ opacity: 1 - a * 0.7 }}>
          Physical trade
        </p>

        {fields.map((f, i) => {
          const col = 1 + i * 2
          const dx = jit(i, 3) * 120 * (1 - a)
          const dy = jit(i, 4) * 90 * (1 - a)
          const rot = jit(i, 5) * 8 * (1 - a)
          return (
            <div
              key={f}
              className={`absolute top-[62%] hidden pl-3 md:block ${i === fields.length - 1 ? "max-xl:!left-auto max-xl:right-0" : ""}`}
              style={{ left: `${(col / (cols - 1)) * 100}%`, maxWidth: "calc(100% / 6 - 0.5rem)", transform: `translate(${dx}px,${dy}px) rotate(${rot}deg)`, opacity: 0.25 + a * 0.75 }}
            >
              <p className="text-xs uppercase tracking-[0.14em] text-near-black/70">{f}</p>
              <p className="mt-2 text-xs text-near-black/55" style={{ opacity: done }}>
                [{f}]
              </p>
            </div>
          )
        })}

        <p className="absolute bottom-[6%] left-5 text-xs uppercase tracking-[0.18em] text-near-black/55 md:left-10" style={{ opacity: a }}>
          Structured transaction record
        </p>
      </div>
    </div>
  )
}
