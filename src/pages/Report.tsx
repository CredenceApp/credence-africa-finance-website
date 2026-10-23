import Nav from "../components/Nav"
import Footer from "../components/Footer"
import ReportGate from "../components/ReportGate"

export default function Report() {
  return (
    <div id="top">
      <Nav />
      <main>
        <section className="relative overflow-hidden bg-near-black pt-40 pb-24 text-white md:pb-32">
          <div className="absolute inset-0 hairline-grid opacity-50" aria-hidden />
          <div className="wrap relative grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="eyebrow text-orange">Credence Market Intelligence · Q4 2026</p>
              <h1 className="mt-7 max-w-[54rem] text-[clamp(3rem,7vw,6.4rem)] leading-[0.96] tracking-[-0.05em]">Information, structured into intelligence.</h1>
            </div>
            <div className="border-t border-white/20 pt-6 lg:border-t-0 lg:border-l lg:pl-8">
              <p className="text-[16px] leading-relaxed text-white/65">A quarterly review for banks, development finance institutions and institutional capital providers evaluating Nigerian trade flows.</p>
              <ReportGate className="mt-8 w-full sm:w-auto" />
            </div>
          </div>
        </section>

        <section className="bg-warm-white py-20 text-near-black md:py-28">
          <div className="wrap grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <div>
              <p className="eyebrow text-green">Inside the report</p>
              <p className="mt-5 font-display text-[clamp(2rem,3.7vw,3.5rem)] leading-[1.05] tracking-[-0.04em]">Market view. Trade conditions. Evidence.</p>
            </div>
            <div className="grid border-t border-near-black/15 sm:grid-cols-3">
              {[
                ["01", "Market View", "Sector views and prices from 2023 to 2026."],
                ["02", "Trade Conditions", "Origination, refinancing, regulation, corridors and locations."],
                ["03", "Perspective & Evidence", "Credence perspective, market data, other verticals and methodology."],
              ].map(([number, title, copy]) => (
                <article key={number} className="border-b border-near-black/15 py-7 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0">
                  <p className="eyebrow text-orange">{number}</p>
                  <h2 className="mt-5 font-display text-2xl tracking-[-0.03em]">{title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-near-black/60">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
