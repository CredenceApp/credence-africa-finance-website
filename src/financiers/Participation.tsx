import { clamp, useScrollProgress } from "../hooks"
import { Head } from "./parts"

const steps: { t: string; d: string; tag?: string; g: string; rows: string[]; cap?: boolean }[] = [
  { t: "Originate and verify", d: "Credence sources trade transactions with identified buyers and suppliers and verifies counterparties, documents and underlying economics.", g: "Counterparties and documents", rows: ["Buyer identified", "Supplier identified", "Documents verified"] },
  { t: "Structure and intelligence", d: "Commercial terms, tenor, payment conditions and monitoring requirements are assembled with relevant transaction intelligence.", g: "Terms and conditions", rows: ["Commercial terms", "Tenor", "Payment conditions", "Monitoring requirements"] },
  { t: "Review and participate", d: "The capital partner reviews the opportunity and decides whether to participate.", g: "Capital review", rows: ["Transaction file reviewed", "Participation decision"], cap: true },
  { t: "Document", d: "A standing framework agreement establishes the ongoing participation terms. Each subsequent transaction can then be documented using a transaction-specific term sheet, so documentation is not restarted for every transaction.", tag: "One framework. Transaction-specific term sheets.", g: "Documentation", rows: ["Framework agreement: standing terms", "Transaction-specific term sheet"], cap: true },
  { t: "Control and monitor", d: "Payments are coordinated through licensed banking partners against agreed transaction conditions. Credence tracks transaction execution through settlement and reports status throughout.", g: "Execution tracking", rows: ["Payments via licensed banking partners", "Conditions and milestones tracked", "Status reported"] },
  { t: "Settle", d: "Transaction status is followed through repayment and settlement.", g: "Settlement", rows: ["Status followed", "Repayment and settlement"] },
]

const Group = ({ s, on, i }: { s: (typeof steps)[number]; on: boolean; i: number }) => (
  <div className={`border-t py-2.5 transition-all duration-700 ${on ? "border-near-black/30 opacity-100" : "border-near-black/10 opacity-25"}`}>
    <div className="flex items-center justify-between">
      <p className="eyebrow text-near-black/55">
        0{i + 1} {s.g}
      </p>
      {s.cap && <span className={`size-2 rounded-full bg-orange transition-opacity ${on ? "opacity-100" : "opacity-0"}`} aria-hidden />}
    </div>
    <ul className="mt-2 space-y-1.5">
      {s.rows.map((r) => (
        <li key={r} className="flex items-center gap-3 text-[15px]">
          <span className={`h-px w-4 ${on ? (s.cap ? "bg-orange" : "bg-green") : "bg-near-black/20"}`} />
          {r}
        </li>
      ))}
    </ul>
  </div>
)

export default function Participation() {
  const [ref, p] = useScrollProgress<HTMLDivElement>()
  const active = Math.min(5, Math.floor(clamp(p) * 6))
  return (
    <section id="fin-process" className="bg-warm-white text-near-black">
      <div className="wrap pt-28 md:pt-40">
        <Head eyebrow="How participation works" title="One transaction, followed from origination to settlement." />
      </div>

      <div className="wrap py-16 lgtall:hidden">
        <ol className="border-l border-near-black/20 pl-6">
          {steps.map((s, i) => (
            <li key={s.t} className="relative pb-12 last:pb-0">
              <span className={`absolute -left-[31px] top-1 size-2.5 rounded-full ${s.cap ? "bg-orange" : "bg-green"}`} />
              <p className="eyebrow text-near-black/50">0{i + 1}</p>
              <h3 className="mt-2 font-display text-2xl tracking-[-0.02em]">{s.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-near-black/65">{s.d}</p>
              {s.tag && <p className="mt-3 font-display text-lg tracking-[-0.02em]">{s.tag}</p>}
              <div className="mt-5 bg-stone/60 px-4">
                <Group s={s} on i={i} />
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div ref={ref} className="hidden h-[340svh] lgtall:block">
        <div className="sticky top-0 flex h-svh items-center">
          <div className="wrap grid w-full grid-cols-[1fr_1.05fr] gap-24">
            <div>
              {steps.map((s, i) => (
                <div key={s.t} className={`border-t py-5 transition-all duration-700 ${i === active ? "border-near-black opacity-100" : "border-near-black/15 opacity-35"}`}>
                  <div className="flex items-baseline gap-5">
                    <span className="eyebrow text-near-black/55">0{i + 1}</span>
                    <h3 className="font-display text-2xl tracking-[-0.02em]">{s.t}</h3>
                  </div>
                  <div className={`grid transition-all duration-700 ${i === active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <p className="overflow-hidden pl-11 pt-3 text-[15px] leading-relaxed text-near-black/65">{s.d}
                      {s.tag && <span className="mt-3 block font-display text-lg tracking-[-0.02em] text-near-black">{s.tag}</span>}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-stone px-9 py-6">
              <div className="flex items-center justify-between pb-4">
                <p className="eyebrow">Transaction file</p>
              </div>
              <div className="bg-warm-white px-6 py-2">
                {steps.map((s, i) => (
                  <Group key={s.t} s={s} i={i} on={i <= active} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
