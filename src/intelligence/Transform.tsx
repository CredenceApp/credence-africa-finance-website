import { clamp, useScrub } from "../hooks"
import { useMobile } from "../merchants/parts"

const stages = ["Operational activity", "Transaction data", "Structured intelligence", "Financing visibility"]
const blocks = ["Transaction", "Counterparty", "Risk", "Portfolio"]
const rnd = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}
const ease = (t: number) => t * t * (3 - 2 * t)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const events = new Set([13, 29, 50])

type Cfg = { W: number; H: number; lane: (c: number, k: number) => [number, number]; block: (c: number, k: number) => [number, number]; final: (c: number, k: number) => [number, number]; label: (b: number) => [number, number] }
const desktop: Cfg = {
  W: 1000, H: 480,
  lane: (c, k) => [150 + k * 100, 40 + c * 58],
  block: (c, k) => [60 + Math.floor(c / 2) * 240 + k * 22, 150 + (c % 2) * 30],
  final: (c, k) => [60 + Math.floor(c / 2) * 240 + k * 22, 120 + (c % 2) * 30],
  label: (b) => [60 + b * 240, 100],
}
const mobile: Cfg = {
  W: 400, H: 520,
  lane: (c, k) => [50 + k * 44, 30 + c * 62],
  block: (c, k) => [24 + (Math.floor(c / 2) % 2) * 190 + k * 18, 70 + Math.floor(Math.floor(c / 2) / 2) * 190 + (c % 2) * 28 + 70],
  final: (c, k) => [24 + (Math.floor(c / 2) % 2) * 190 + k * 18, 50 + Math.floor(Math.floor(c / 2) / 2) * 190 + (c % 2) * 28 + 70],
  label: (b) => [24 + (b % 2) * 190, 50 + Math.floor(b / 2) * 190 + 60],
}

export default function Transform() {
  const [ref, p] = useScrub<HTMLDivElement>()
  const m = useMobile()
  const cfg = m ? mobile : desktop
  const t1 = ease(clamp((p - 0.12) / 0.2))
  const t2 = ease(clamp((p - 0.38) / 0.2))
  const t3 = ease(clamp((p - 0.64) / 0.2))
  const stage = p < 0.3 ? 0 : p < 0.55 ? 1 : p < 0.8 ? 2 : 3
  const els = []
  for (let c = 0; c < 8; c++)
    for (let k = 0; k < 8; k++) {
      const id = c * 8 + k
      const s: [number, number] = [rnd(id) * (cfg.W - 40) + 20, rnd(id + 99) * (cfg.H - 60) + 30]
      const l = cfg.lane(c, k)
      const b = cfg.block(c, k)
      const f = cfg.final(c, k)
      let x = lerp(s[0], l[0], t1)
      let y = lerp(s[1], l[1], t1)
      x = lerp(x, b[0], t2)
      y = lerp(y, b[1], t2)
      x = lerp(x, f[0], t3)
      y = lerp(y, f[1], t3)
      const rot = (rnd(id + 7) * 160 - 80) * (1 - t1)
      const ev = events.has(id) && t1 > 0.9
      els.push(
        <path
          key={id}
          d="M0 -7 v14"
          transform={`translate(${x} ${y}) rotate(${rot})`}
          stroke={ev ? "#f08921" : t2 > 0.5 ? "#4f8a7e" : "rgba(255,255,255,0.7)"}
          strokeWidth={ev ? 2.5 : 1.6}
          opacity={0.35 + t1 * 0.65}
        />,
      )
    }
  return (
    <section id="int-activity" className="bg-midnight text-white">
      <div ref={ref} className="tall:h-[290svh]">
        <div className="flex flex-col justify-center py-14 tall:sticky tall:top-0 tall:h-svh tall:py-8">
          <div className="wrap">
            <p className="eyebrow text-white/55">From activity to intelligence</p>
            <ol className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
              {stages.map((s, i) => (
                <li key={s} className={`flex items-center gap-3 text-xs uppercase tracking-[0.12em] transition-colors duration-500 md:text-sm ${i === stage ? "text-white" : "text-white/35"}`}>
                  <span className={`h-px w-6 transition-colors ${i === stage ? "bg-green" : "bg-white/25"}`} />
                  {s}
                </li>
              ))}
            </ol>
            <svg viewBox={`0 0 ${cfg.W} ${cfg.H}`} className="mt-6 w-full max-h-[62svh]" fill="none" role="img" aria-label="Fragmented operational information progressively organising into transaction data, structured intelligence and one financing visibility system.">
              {els}
              {blocks.map((t, b) => {
                const [x, y] = cfg.label(b)
                return (
                  <text key={t} x={x} y={y - (t3 * 30)} fill="#fff" fontSize={m ? 13 : 12} letterSpacing="1.5" className="font-sans uppercase" opacity={clamp((p - 0.55) / 0.12)}>
                    {t}
                  </text>
                )
              })}
              {!m && (
                <g opacity={t3}>
                  <path d="M60 262 H940" stroke="#4f8a7e" pathLength={1} />
                  {[0, 1, 2, 3].map((b) => (
                    <path key={b} d={`M${60 + b * 240 + 90} 190 V262`} stroke="#4f8a7e" />
                  ))}
                  <text x="60" y="290" fill="#fff" fontSize="12" letterSpacing="1.5" className="font-sans uppercase">
                    One transaction and portfolio intelligence system
                  </text>
                </g>
              )}
              {m && (
                <text x="24" y="500" fill="#fff" fontSize="13" letterSpacing="1.4" className="font-sans uppercase" opacity={t3}>
                  One intelligence system
                </text>
              )}
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
