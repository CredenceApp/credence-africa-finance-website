import { Head } from "./parts"
import { useInView, EASE } from "../hooks"

const lanes = [
  { t: "Agriculture", n: 5 },
  { t: "Energy", n: 4 },
  { t: "Solid Minerals", n: 4 },
  { t: "Cross Border Trade", n: 5 },
]

export default function Origination() {
  const [ref, seen] = useInView<HTMLDivElement>(0.25)
  const laneY = (i: number) => 70 + i * 110
  return (
    <section className="section-y bg-warm-white text-near-black">
      <div className="wrap">
        <Head
          eyebrow="Origination"
          title="Extend your reach without extending your operating burden."
          copy="Credence expands institutional origination across African real economy trade corridors by sourcing and structuring short tenor commodity and trade transactions."
        />

        <div ref={ref} className="mt-20 hidden lg:block">
          <svg viewBox="0 0 1200 520" className="w-full" fill="none" role="img" aria-label="Opportunities from agriculture, energy, solid minerals and cross border trade entering one structured origination pipeline.">
            {lanes.map((l, i) => {
              const y = laneY(i)
              return (
                <g key={l.t}>
                  <text x="0" y={y - 24} fontSize="11" letterSpacing="1.6" fill="rgba(11,14,13,0.6)" className="font-sans uppercase">
                    {l.t}
                  </text>
                  <path d={`M0 ${y} H780`} stroke="rgba(11,14,13,0.08)" />
                  {Array.from({ length: l.n }).map((_, k) => {
                    const x = 20 + k * 70 + (i % 2) * 20
                    const w = 34 + ((k * 13 + i * 7) % 26)
                    const moved = seen ? 0 : 1
                    return (
                      <rect
                        key={k}
                        x={x}
                        y={y - 9 + ((k + i) % 3) * 3 - 3}
                        width={w}
                        height="16"
                        stroke="rgba(11,14,13,0.5)"
                        strokeDasharray="3 3"
                        style={{
                          transform: `translateY(${moved * ((k % 2 ? 1 : -1) * 10)}px)`,
                          opacity: seen ? 1 : 0.3,
                          transition: `all 1.2s ${EASE} ${0.1 * k + 0.12 * i}s`,
                        }}
                      />
                    )
                  })}
                  <path
                    d={`M420 ${y} C 560 ${y}, 600 260, 780 260`}
                    stroke="#4f8a7e"
                    strokeWidth="1.5"
                    pathLength={1}
                    strokeDasharray={1}
                    strokeDashoffset={seen ? 0 : 1}
                    style={{ transition: `stroke-dashoffset 1.6s ${EASE} ${0.6 + i * 0.2}s` }}
                  />
                </g>
              )
            })}
            <path d="M780 260 H1130" stroke="#2e5f57" strokeWidth="3" pathLength={1} strokeDasharray={1} strokeDashoffset={seen ? 0 : 1} style={{ transition: `stroke-dashoffset 1.4s ${EASE} 1.6s` }} />
            <g style={{ opacity: seen ? 1 : 0, transition: `opacity 1s ${EASE} 2.4s` }}>
              <circle cx="780" cy="260" r="5" fill="#2e5f57" />
              <text x="812" y="236" fontSize="12" letterSpacing="1.8" fill="rgba(11,14,13,0.6)" className="font-sans uppercase">
                Verified and structured
              </text>
              <text x="812" y="300" fontSize="24" letterSpacing="-0.48" fill="#0b0e0d" className="font-display">
                One origination pipeline
              </text>
              <path d="M1118 252 L1130 260 L1118 268" stroke="#2e5f57" strokeWidth="2" />
            </g>
          </svg>
        </div>

        <ol className="mt-14 border-t border-near-black/15 lg:hidden">
          {lanes.map((l, i) => (
            <li key={l.t} className="flex items-center justify-between border-b border-near-black/15 py-5">
              <span className="eyebrow text-near-black/55">0{i + 1}</span>
              <span className="font-display text-xl tracking-[-0.02em]">{l.t}</span>
            </li>
          ))}
          <li className="flex items-center gap-3 pt-6 text-green">
            <span className="h-px flex-1 bg-green" />
            <span className="eyebrow">One origination pipeline</span>
          </li>
        </ol>
      </div>
    </section>
  )
}
