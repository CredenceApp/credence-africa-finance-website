import { clamp, useScrub, EASE } from "../hooks"

const chips = [
  { t: "Buyer", x: -34, y: -26, r: -8 },
  { t: "Supplier", x: 30, y: -30, r: 7 },
  { t: "Documents", x: -40, y: 8, r: 6 },
  { t: "Commercial terms", x: 38, y: 12, r: -6 },
  { t: "Security", x: -28, y: 34, r: -5 },
  { t: "Payment terms", x: 32, y: 36, r: 8 },
]

export default function FileConsolidation() {
  const [ref, p] = useScrub<HTMLDivElement>()
  const q = clamp((p - 0.1) / 0.6)
  const e = q * q * (3 - 2 * q)
  const done = clamp((p - 0.7) / 0.2)
  return (
    <section className="bg-midnight text-white">
      <div ref={ref} className="tall:h-[190svh]">
        <div className="flex flex-col justify-center overflow-hidden py-14 tall:sticky tall:top-0 tall:h-svh tall:pb-4 tall:pt-16">
          <div className="wrap">
            <p className="eyebrow text-white/55">Structured for review</p>
            <h2 className="display-section mt-5">
              One transaction.
              <br />
              One decision ready file.
            </h2>
            <p className="mt-5 max-w-[36rem] text-base leading-relaxed text-white/65 md:text-[17px]">
              Each transaction brings together commercial terms, tenor, payment conditions, monitoring requirements and relevant trade intelligence.
            </p>
            <div className="relative mx-auto mt-6 w-full max-w-[44rem]">
              <div
                className="absolute inset-0 border border-green/70 bg-deep-green/25"
                style={{ opacity: 0.25 + done * 0.75, transition: `opacity .4s ${EASE}` }}
              />
              <div className="relative px-5 py-5 md:px-8 md:py-5">
                <p className="eyebrow text-white" style={{ opacity: e }}>
                  Structured transaction file
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3 md:gap-4">
                  {chips.map((c) => (
                    <div
                      key={c.t}
                      className="border border-white/35 bg-midnight px-4 py-3 font-display text-sm tracking-[-0.01em] md:text-base"
                      style={{
                        transform: `translate(${(1 - e) * c.x}vw, ${(1 - e) * c.y}svh) rotate(${(1 - e) * c.r}deg)`,
                        borderColor: e > 0.98 ? "rgba(79,138,126,0.9)" : undefined,
                      }}
                    >
                      {c.t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
