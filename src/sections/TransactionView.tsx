import ProductShot, { ShotNote } from "../components/ProductShot"

export default function TransactionView() {
  return (
    <section className="section-y overflow-hidden bg-stone !pt-10 md:!pt-16">
      <div className="wrap grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.75rem)] leading-[0.98] tracking-[-0.04em]">
            One transaction.
            <br />
            One structured view.
          </h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-near-black/70">
            Documents, counterparties, terms, capital and milestones, brought together in a single record.
          </p>
          <ShotNote className="mt-8" />
        </div>

        <div className="relative pb-0 md:pb-36 md:pt-8 lg:col-span-8 lg:pb-[200px] lg:pt-[190px]">
          <div className="md:ml-12 lg:mr-6">
            <ProductShot
              desktop={["01-transaction-workspace@2x.png", 3200, 2000]}
              mobile={["01M-transaction-workspace@3x.png", 1290, 1788]}
              alt="Credence transaction workspace showing one structured transaction record."
              className="mx-auto max-w-md md:max-w-none"
            />
          </div>
          <div className="absolute bottom-0 left-0 z-10 hidden w-[34%] md:block">
            <ProductShot
              delay={200}
              desktop={["02-document-status@2x.png", 1200, 860]}
              alt="Document status card listing required transaction documents and their review state."
            />
          </div>
          <div className="absolute right-0 top-0 z-10 hidden w-[26%] lg:block">
            <ProductShot
              delay={380}
              desktop={["03-internal-assessment-summary@3x.png", 1290, 1152]}
              alt="Credence internal assessment summary."
            />
          </div>
        </div>
      </div>
    </section>
  )
}
