import Reveal from "../components/Reveal"
import ProductShot from "../components/ProductShot"
import { Head } from "./parts"

export default function Control() {
  return (
    <section className="section-y bg-stone text-near-black">
      <div className="wrap grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <Head eyebrow="Control through execution" title="Capital deployed with greater control." />
          <Reveal delay={200}>
            <p className="mt-7 max-w-[30rem] text-base leading-relaxed text-near-black/65 md:text-[17px]">
              Credence coordinates transaction execution, tracks milestones and maintains ongoing visibility from deployment through settlement.
            </p>
            <p className="mt-4 max-w-[30rem] text-[15px] leading-relaxed text-near-black/60">
              Payments are coordinated through licensed banking partners against agreed transaction conditions. Credence tracks execution through settlement and provides status visibility throughout the transaction lifecycle.
            </p>
            <p className="mt-4 max-w-[30rem] text-[15px] leading-relaxed text-near-black/60">
              Where relevant, the platform may support virtual accounts, escrow-controlled settlement, milestone-based disbursement, repayment collection and payment monitoring.
            </p>
            <div className="mt-8 max-w-[30rem] border-t border-near-black/20 pt-4">
              <p className="eyebrow text-near-black/55">Reporting to capital partners may include</p>
              <ul className="mt-3 grid gap-x-6 sm:grid-cols-2">
                {["Settlement reports", "Trade performance information", "Repayment confirmations", "Updated risk information", "Transaction documentation", "Execution status"].map((r) => (
                  <li key={r} className="flex items-baseline gap-3 border-t border-near-black/10 py-2 text-[15px] text-near-black/75">
                    <span className="h-px w-3 shrink-0 bg-green" aria-hidden />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        <div className="lg:self-center lg:pl-6">
          <ProductShot
            delay={150}
            desktop={["05-financier-transaction-monitoring@2x.png", 3200, 2000]}
            mobile={["05M-financier-monitoring@3x.png", 1290, 2046]}
            alt="Financier transaction monitoring view showing milestones, documents and status updates."
            className="mx-auto max-w-md md:max-w-none"
          />
        </div>
      </div>
    </section>
  )
}
