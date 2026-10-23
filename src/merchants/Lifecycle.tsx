import { clamp, useScrollProgress } from "../hooks"
import ProductShot, { ShotNote } from "../components/ProductShot"
import { Head } from "./parts"

const stages: [string, string][] = [
  ["Submit opportunity", "A merchant presents an identifiable real trade opportunity with supporting information."],
  ["Review", "Credence reviews the opportunity, trade structure and information available."],
  ["Structure", "Commercial terms, transaction value, funding requirement, tenor and repayment route are organised around the trade."],
  ["Due diligence", "Relevant KYC/KYB, compliance, counterparty, documentation and commercial checks are completed as required."],
  ["Capital review", "Where suitable, the transaction is coordinated for review by aligned capital partners."],
  ["Documentation & controls", "Required documentation, payment conditions and execution controls are established."],
  ["Execute", "The transaction moves into execution against agreed requirements."],
  ["Monitor", "Credence tracks milestones, documentation, payment conditions and relevant execution indicators."],
  ["Settle", "Transaction status is followed through settlement."],
]
const note = "Not every submitted transaction proceeds to capital review or funding. Approval and funding are not guaranteed."
const N = stages.length

export default function Lifecycle() {
  const [ref, p] = useScrollProgress<HTMLDivElement>()
  const a = Math.min(N - 1, Math.floor(clamp(p) * N))
  return (
    <section className="bg-warm-white text-near-black">
      <div className="wrap grid gap-12 pt-28 md:pt-40 lg:grid-cols-[1.1fr_0.8fr] lg:items-end lg:gap-20">
        <Head eyebrow="From opportunity to execution" title="One trade, carried from the first conversation to settlement." />
        <div>
          <ProductShot
            desktop={["06-merchant-submit-transaction@2x.png", 2880, 2160]}
            mobile={["06M-merchant-submission@3x.png", 1290, 1977]}
            alt="Merchant transaction submission form with commodity, quantity, pricing and document upload steps."
            className="mx-auto max-w-md md:max-w-none"
          />
          <ShotNote className="mt-3" />
        </div>
      </div>

      <div className="wrap py-14 lgmid:hidden">
        <ol className="border-l border-near-black/20 pl-6">
          {stages.map(([t, d], i) => (
            <li key={t} className="relative pb-9 last:pb-0">
              <span className={`absolute -left-[31px] top-1 size-2.5 rounded-full ${i === 4 ? "bg-orange" : "bg-green"}`} />
              <p className="eyebrow text-near-black/50">0{i + 1}</p>
              <h3 className="mt-1 font-display text-2xl tracking-[-0.02em]">{t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-near-black/65">{d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-sm text-near-black/55">{note}</p>
      </div>

      <div ref={ref} className="hidden h-[340svh] lgmid:block">
        <div className="sticky top-0 flex h-svh flex-col justify-between py-24">
          <div className="wrap flex flex-1 items-center">
            <div className="grid w-full grid-cols-[auto_1fr] items-end gap-16">
              <span className="font-display text-[clamp(7rem,16vw,15rem)] leading-[0.8] tracking-[-0.06em] text-near-black/12">0{a + 1}</span>
              <div key={a} style={{ animation: "rise .7s cubic-bezier(0.65,0,0.35,1) both" }}>
                <h3 className="font-display text-5xl tracking-[-0.03em]">{stages[a][0]}</h3>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-near-black/65">{stages[a][1]}</p>
              </div>
            </div>
          </div>
          <div className="wrap">
            <ol className="relative grid grid-cols-9">
              <span className="absolute left-0 right-0 top-[5px] h-px bg-near-black/20" />
              <span className="absolute left-0 top-[5px] h-px bg-green transition-all duration-700" style={{ width: `${(a / N) * 100 + 5}%` }} />
              {stages.map(([t], i) => (
                <li key={t} className="relative min-w-0 pt-6 pr-1 xl:pr-3">
                  <span
                    className={`absolute left-0 top-0 size-[11px] rounded-full border transition-colors duration-500 ${
                      i === 4 && i <= a ? "border-orange bg-orange" : i <= a ? "border-green bg-green" : "border-near-black/30 bg-warm-white"
                    }`}
                  />
                  <p className={`text-[10.5px] uppercase leading-snug tracking-[0.02em] transition-colors xl:text-xs xl:tracking-[0.08em] ${i === a ? "text-near-black" : "text-near-black/40"}`}>{t}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm text-near-black/50">{note}</p>
          </div>
        </div>
      </div>

      <div className="wrap pb-24 md:pb-36">
        <ProductShot
          desktop={["07-merchant-transaction-progress@2x.png", 3200, 1600]}
          mobile={["07M-merchant-progress@3x.png", 1290, 1962]}
          alt="Merchant transaction progress view showing stage, milestones and status updates."
          className="mx-auto max-w-md md:max-w-none lg:ml-auto lg:w-[80%]"
        />
      </div>
    </section>
  )
}
