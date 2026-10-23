import Button from "../components/Button"
import Photo from "../components/Photo"
import { img } from "../images"
import { EASE } from "../hooks"
import { getStarted, goto, contactHref } from "../links"

const rise = (d: number) => ({ animation: `rise .9s ${EASE} ${d}s both` })
const stages = ["Trade opportunity", "Transaction structure", "Aligned capital", "Execution"]
const slip = ["Commodity", "Buyer", "Supplier", "Capital requirement", "Payment path"]

export default function MerHero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-near-black text-white">
      <Photo
        priority
        src={img("merchant", 2000, 1300)}
        alt="Commodity trade in progress"
        className="absolute inset-0"
        shade="from-near-black/90 via-near-black/45 to-near-black/70"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-near-black/90 via-near-black/45 to-transparent" />
      <div className="wrap relative grid items-center gap-16 pt-32 pb-60 sm:pb-52 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <p className="eyebrow text-white/70" style={rise(0)}>
            For merchants
          </p>
          <h1 className="mt-6 text-[clamp(2.5rem,5.4vw,4.75rem)] leading-[1.02] tracking-[-0.04em]" style={rise(0.1)}>
Turn trade opportunities into executed transactions.
          </h1>
          <p className="mt-8 max-w-[35rem] text-base leading-relaxed text-white/75 md:text-[17px]" style={rise(0.2)}>
            Credence helps commodity traders across Africa structure and finance real trade transactions, connecting qualifying opportunities with the capital and transaction support needed to execute.
          </p>
          <div className="mt-10 flex flex-wrap gap-3" style={rise(0.3)}>
            <Button variant="light" onClick={() => getStarted("merchant")}>Get Started</Button>
            <Button variant="outline-dark" onClick={() => goto(contactHref("merchant"))}>
              Talk to Sales
            </Button>
          </div>
        </div>

        <div className="hidden justify-self-end lg:block" style={rise(0.5)} aria-hidden>
          <div className="w-[19rem] border border-white/30 bg-near-black/55 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-white/25 pb-3">
              <span className="eyebrow">Trade opportunity</span>
            </div>
            <ul>
              {slip.map((s, i) => (
                <li key={s} className="flex items-center justify-between border-b border-white/12 py-3 text-sm text-white/80">
                  {s}
                  <span className={`h-px ${i === 3 ? "bg-orange" : "bg-white/40"}`} style={{ width: 28 + ((i * 17) % 30) }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 pb-10">
        <div className="wrap">
          <ol className="relative grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-2">
            <span className="absolute left-0 right-0 top-[5px] hidden h-px bg-white/25 sm:block" />
            {stages.map((s, i) => (
              <li key={s} className="relative pt-5 max-sm:border-t max-sm:border-white/25" style={{ animation: `fade .8s ${EASE} ${0.8 + i * 0.5}s both` }}>
                <span className={`absolute left-0 top-0 size-[11px] rounded-full border max-sm:-top-[6px] ${i === 2 ? "border-orange bg-orange" : "border-white bg-near-black"}`} />
                <p className="eyebrow text-xs text-white/45">0{i + 1}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.1em] text-white/85 md:text-xs">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
