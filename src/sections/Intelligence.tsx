import Button from "../components/Button"
import Reveal from "../components/Reveal"
import { clamp, useScrollProgress } from "../hooks"

const inputs = ["Documents", "Milestones", "Payments", "Delivery events", "Counterparty records"]
const outputs = [
  { title: "Transaction Intelligence", items: ["Activity", "Volumes", "Documentation", "Milestones"] },
  { title: "Counterparty Intelligence", items: ["Buyers", "Suppliers", "Verified information", "Performance"] },
  { title: "Risk Intelligence", items: ["Exceptions", "Payment behaviour", "Execution signals", "Risk changes"] },
  { title: "Portfolio Intelligence", items: ["Exposure", "Performance", "Transaction lifecycle", "Reporting"] },
]

const irregular = ["1 6 3 5 2 7", "2 8 1 4 3 6", "1 9 2 3 1 8", "3 4 1 7 2 7", "1 3 2 9 3 6"]
const ROWS = 14
const COLS = 8
const events = new Set(["3-5", "9-2", "11-6"])

function Record({ a }: { a: number }) {
  return (
    <g>
      {Array.from({ length: ROWS }).map((_, r) => {
        const y = 126 + r * 28
        return (
          <g key={r}>
            <path d={`M470 ${y + 8} H630`} stroke="rgba(255,255,255,0.07)" />
            {Array.from({ length: COLS }).map((__, c) => {
              const jit = (((r * 37 + c * 53) % 17) / 17 - 0.5) * 0.9
              const pos = clamp(c / (COLS - 1) + jit * (1 - a), 0, 1)
              const ev = events.has(`${r}-${c}`) && a > 0.95
              return (
                <path
                  key={c}
                  d={`M${470 + pos * 160} ${y + (ev ? -2 : 0)} v${ev ? 16 : 12}`}
                  stroke={ev ? "#f08921" : `rgba(255,255,255,${0.3 + a * 0.45})`}
                  strokeWidth={ev ? 2 : 1.5}
                />
              )
            })}
          </g>
        )
      })}
    </g>
  )
}

function Diagram({ p }: { p: number }) {
  const align = clamp((p - 0.25) / 0.25)
  const live = clamp(p / 0.1)
  return (
    <svg viewBox="0 0 1200 650" className="w-full" fill="none" role="img" aria-label="Operational activity flows into one live transaction record, which produces Transaction, Counterparty, Risk and Portfolio Intelligence, giving better financing visibility.">
      <path d="M0 48 H1200" stroke="rgba(255,255,255,0.12)" />
      {[
        [0, "Operational activity", p < 0.25],
        [470, "Transaction data", p >= 0.25 && p < 0.45],
        [832, "Structured intelligence", p >= 0.45],
      ].map(([x, t, on]) => (
        <g key={t as string}>
          <path d={`M${x} 42 v12`} stroke={on ? "#4f8a7e" : "rgba(255,255,255,0.3)"} strokeWidth="1.5" />
          <text x={x as number} y="30" fill={on ? "#fff" : "rgba(255,255,255,0.4)"} fontSize="11" letterSpacing="1.8" className="font-sans uppercase" style={{ transition: "fill 500ms" }}>
            {t as string}
          </text>
        </g>
      ))}

      {inputs.map((t, i) => {
        const y = 130 + i * 95
        const yc = 150 + i * 85
        const d = `M180 ${y} C 320 ${y}, 320 ${yc}, 460 ${yc}`
        const draw = clamp((p - 0.02 - i * 0.04) / 0.2)
        return (
          <g key={t}>
            <text x="0" y={y + 4} fill="rgba(255,255,255,0.7)" fontSize="13.5" className="font-sans" style={{ opacity: clamp(live * 2 - i * 0.2) }}>
              {t}
            </text>
            <circle cx="180" cy={y} r="3" fill="#0b0e0d" stroke="rgba(255,255,255,0.7)" style={{ opacity: live }} />
            <path d={d} stroke="rgba(255,255,255,0.22)" strokeWidth="1" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
            {draw > 0.98 && <path d={d} stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeDasharray={irregular[i]} style={{ animation: `flow ${1.6 + i * 0.25}s linear infinite` }} />}
          </g>
        )
      })}

      <g style={{ opacity: live }}>
        <rect x="460" y="96" width="180" height="440" stroke="rgba(255,255,255,0.28)" />
        <text x="470" y="84" fill="rgba(255,255,255,0.55)" fontSize="10" letterSpacing="1.6" className="font-sans uppercase">
          Live transaction record
        </text>
        <circle cx="630" cy="80" r="3" fill="#4f8a7e">
          <animate attributeName="opacity" values="1;0.2;1" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <Record a={align} />
      </g>

      {outputs.map((o, k) => {
        const yc = 190 + k * 80
        const ye = 96 + k * 130
        const d = `M640 ${yc} C 730 ${yc}, 740 ${ye}, 815 ${ye}`
        const draw = clamp((p - 0.42 - k * 0.1) / 0.2)
        const t = clamp((p - 0.52 - k * 0.1) / 0.15)
        return (
          <g key={o.title}>
            <path d={d} stroke="#4f8a7e" strokeWidth="2" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
            {draw > 0.98 && <path d={d} stroke={k === 2 ? "#f08921" : "#9fd0c4"} strokeWidth="2" strokeDasharray="2 22" style={{ animation: `flow ${2 + k * 0.3}s linear infinite` }} />}
            <circle cx="815" cy={ye} r="3.5" fill="#4f8a7e" style={{ opacity: draw > 0.98 ? 1 : 0, transition: "opacity 400ms" }} />
            <g style={{ opacity: t, transform: `translateX(${(1 - t) * 14}px)` }}>
              <text x="832" y={ye + 5} fill="#fff" fontSize="17" letterSpacing="-0.3" className="font-display">
                {o.title}
              </text>
              {o.items.map((it, j) => (
                <text key={it} x="832" y={ye + 30 + j * 20} fill="rgba(255,255,255,0.55)" fontSize="13" className="font-sans">
                  {it}
                </text>
              ))}
            </g>
          </g>
        )
      })}

      <g style={{ opacity: clamp((p - 0.85) / 0.1) }}>
        <path d="M832 612 H1200" stroke="#4f8a7e" strokeWidth="1.5" />
        <path d="M1192 607 l8 5 l-8 5" stroke="#4f8a7e" strokeWidth="1.5" />
        <text x="832" y="638" fill="#fff" fontSize="11" letterSpacing="1.8" className="font-sans uppercase">
          Better financing visibility
        </text>
      </g>
    </svg>
  )
}

const chain = ["Operational activity", "Transaction data", "Structured intelligence", "Better financing visibility"]

export default function Intelligence() {
  const [ref, p] = useScrollProgress<HTMLDivElement>()

  return (
    <section id="intelligence" className="bg-near-black text-white">
      <div className="wrap grid gap-12 pt-32 pb-16 md:pt-48 md:pb-24 lg:grid-cols-12">
        <Reveal className="lg:col-span-9">
          <p className="eyebrow text-white/50">Credence Intelligence</p>
          <h2 className="mt-6 font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.96] tracking-[-0.045em]">
            Building the intelligence layer for trade finance.
          </h2>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-4 lg:col-start-9 lg:self-end">
          <p className="font-display text-2xl leading-snug tracking-tight text-white/45">
            Operational data.
            <br />
            Transaction intelligence.
            <br />
            <span className="text-white">Better financing decisions.</span>
          </p>
        </Reveal>
      </div>

      <div ref={ref} className="relative hidden h-[230svh] lgmid:block">
        <div className="sticky top-0 flex h-screen items-center pt-14">
          <div className="hairline-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]" />
          <div className="wrap relative">
            <div className="mx-auto max-w-[1200px]">
              <Diagram p={p} />
            </div>
          </div>
        </div>
      </div>

      <div className="wrap lgmid:hidden">
        <ol className="border-l border-green pl-6">
          {chain.map((c, i) => (
            <li key={c} className="relative py-3 font-display text-xl tracking-tight text-white/80">
              <span className="absolute -left-[29px] top-[1.15rem] size-2 bg-orange" aria-hidden />
              <span className="mr-3 text-xs tabular-nums text-white/40">0{i + 1}</span>
              {c}
            </li>
          ))}
        </ol>
        <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {outputs.map((o) => (
            <div key={o.title} className="py-6">
              <p className="font-display text-xl tracking-tight">{o.title}</p>
              <p className="mt-2 text-sm text-white/55">{o.items.join("  ·  ")}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="wrap py-28 md:py-44">
        <div className="max-w-3xl">
          <p className="display-sub">From operational data to financing intelligence.</p>
          <Button variant="light" className="mt-8" onClick={() => (window.location.hash = "#/intelligence")}>
            Explore Credence Intelligence
          </Button>
        </div>
      </div>
    </section>
  )
}
