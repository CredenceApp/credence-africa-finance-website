import { clamp, useScrub } from "../hooks"
import { useMobile } from "./parts"

const steps = [
  ["Structure the trade", "Define the transaction, commercial terms, capital requirement, tenor, repayment path and execution requirements."],
  ["Access appropriate capital", "Connect qualifying transactions with capital partners whose requirements align with the transaction."],
  ["Strengthen the transaction", "Organise the documentation, counterparties, economics and information required for assessment."],
  ["Execute with visibility", "Coordinate payment controls, monitoring and settlement across the transaction lifecycle."],
]

function Trade({ active, mobile }: { active: number; mobile: boolean }) {
  const P = (u: number, v: number): [number, number] => (mobile ? [150 + v, 40 + u * 330] : [70 + u * 460, 200 + v])
  const anchor = (v: number) => (mobile ? (v < 0 ? "end" : "start") : "middle")
  const lab = (u: number, v: number, t: string, fill = "#fff") => {
    const [x, y] = P(u, v)
    return (
      <text x={x} y={y + 4} textAnchor={anchor(v)} fill={fill} fontSize={mobile ? 14 : 13} letterSpacing={mobile ? "1" : "1.4"} className="font-sans uppercase">
        {t}
      </text>
    )
  }
  const layer = (on: boolean) => ({ opacity: on ? 1 : 0, transition: "opacity .9s cubic-bezier(0.65,0,0.35,1)" })
  const [ax, ay] = P(0, 0)
  const [bx, by] = P(1, 0)
  const [s0x, s0y] = P(0.25, -26)
  const [s1x, s1y] = P(0.75, -62)
  const [cx, cy] = P(0.5, 0)
  const [kx, ky] = P(0.5, 80)
  const [m0x, m0y] = P(0, 0)
  return (
    <svg viewBox={mobile ? "0 0 340 420" : "0 0 600 330"} className="mx-auto w-full max-h-[40svh] lg:max-h-none" fill="none" role="img" aria-label="One trade opportunity advancing from structure to capital, documentation and monitored execution.">
      <path d={`M${ax} ${ay} L${bx} ${by}`} stroke="rgba(255,255,255,0.35)" strokeDasharray="4 5" />
      <path d={`M${ax} ${ay} L${m0x + (bx - ax) * Math.min(1, active / 3 + 0.0)} ${m0y + (by - ay) * Math.min(1, active / 3)}`} stroke="#fff" strokeWidth="2" style={{ transition: "all .9s cubic-bezier(0.65,0,0.35,1)" }} />
      <rect x={ax - 7} y={ay - 7} width="14" height="14" fill="#fff" />
      <rect x={bx - 7} y={by - 7} width="14" height="14" stroke="#fff" fill={active >= 3 ? "#fff" : "none"} style={{ transition: "fill .9s" }} />
      {lab(0, mobile ? 0 : -26, mobile ? "" : "Merchant")}
      {lab(1, mobile ? 0 : -26, mobile ? "" : "Buyer")}
      {mobile && (
        <>
          <text x={ax + 18} y={ay + 4} fill="#fff" fontSize="15" letterSpacing="1.4" className="font-sans uppercase">Merchant</text>
          <text x={bx + 18} y={by + 4} fill="#fff" fontSize="15" letterSpacing="1.4" className="font-sans uppercase">Buyer</text>
        </>
      )}

      <g style={layer(active >= 0)}>
        <rect x={Math.min(s0x, s1x)} y={Math.min(s0y, s1y)} width={Math.abs(s1x - s0x)} height={Math.abs(s1y - s0y)} stroke="#fff" />
        {lab(0.5, mobile ? -50 : -90, "Structure", "rgba(255,255,255,0.85)")}
      </g>
      <g style={layer(active >= 1)}>
        <path d={`M${cx} ${cy} L${kx} ${ky}`} stroke="#f08921" strokeWidth="2" />
        <circle cx={kx} cy={ky} r="7" fill="#f08921" />
        {mobile ? (
          <text x={kx + 24} y={ky - 2} fill="#f08921" fontSize="13" letterSpacing="1.2" className="font-sans uppercase">
            <tspan x={kx + 24}>Aligned</tspan>
            <tspan x={kx + 24} dy="17">capital</tspan>
          </text>
        ) : (
          lab(0.5, 104, "Aligned capital", "#f08921")
        )}
      </g>
      <g style={layer(active >= 2)}>
        {[0.2, 0.4, 0.6, 0.8].map((u) => {
          const [x, y] = P(u, 0)
          return (
            <g key={u}>
              <rect x={x - 6} y={y - 6} width="12" height="12" fill="#173b35" stroke="#fff" />
              <path d={`M${x - 3} ${y} l2 2 4 -4`} stroke="#fff" />
            </g>
          )
        })}
        {lab(0.5, mobile ? 0 : 36, mobile ? "" : "Documents and counterparties", "rgba(255,255,255,0.85)")}
      </g>
      <g style={layer(active >= 3)}>
        {lab(0.9, mobile ? 60 : 62, "Monitoring", "rgba(255,255,255,0.85)")}
        {[0.35, 0.65, 0.9].map((u) => {
          const [x, y] = P(u, 0)
          return <circle key={u} cx={x} cy={y} r="3.5" fill="#fff" />
        })}
      </g>
    </svg>
  )
}

export default function Brings() {
  const [ref, p] = useScrub<HTMLDivElement>()
  const mobile = useMobile()
  const active = Math.min(3, Math.floor(clamp(p) * 4))
  return (
    <section className="bg-deep-green text-white">
      <div ref={ref} className="tall:h-[210svh]">
        <div className="flex flex-col justify-center py-14 tall:sticky tall:top-0 tall:h-svh tall:py-0">
          <div className="wrap grid w-full items-center gap-4 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div className="order-2 lg:order-1">
              <p className="eyebrow mb-4 text-white/60 lg:mb-8">What Credence brings</p>
              {steps.map(([t, d], i) => (
                <div key={t} className={`border-t py-3 transition-all duration-700 lg:py-6 ${i === active ? "border-white opacity-100" : "border-white/20 opacity-40"}`}>
                  <div className="flex items-baseline gap-4">
                    <span className="eyebrow text-white/60">0{i + 1}</span>
                    <h3 className="font-display text-xl tracking-[-0.02em] lg:text-3xl">{t}</h3>
                  </div>
                  <div className={`grid transition-all duration-700 ${i === active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <p className="overflow-hidden pl-9 pt-2 text-[15px] leading-relaxed text-white/75 lg:pt-3">{d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="order-1 lg:order-2">
              <Trade active={active} mobile={mobile} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
