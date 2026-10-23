import Nav from "../components/Nav"
import Footer from "../components/Footer"
import Reveal from "../components/Reveal"

export default function Careers() {
  return (
    <div id="top">
      <Nav />
      <main>
        <section className="flex min-h-[70svh] items-end bg-near-black pt-40 pb-20 text-white md:pb-28">
          <div className="wrap">
            <p className="eyebrow text-white/55">Careers</p>
            <h1 className="mt-6 max-w-[52rem] text-[clamp(2.5rem,5.4vw,4.75rem)] leading-[1.02] tracking-[-0.04em]">
              Build the infrastructure behind real economy trade.
            </h1>
            <p className="mt-8 max-w-[34rem] text-base leading-relaxed text-white/65 md:text-[17px]">
              Credence is building trade finance infrastructure for African real economy trade.
            </p>
          </div>
        </section>
        <section className="section-y bg-warm-white text-near-black">
          <div className="wrap">
            <Reveal>
              <p className="eyebrow text-near-black/55">Open roles</p>
              <div className="mt-6 max-w-[48rem] border-y border-near-black/20 py-14">
                <p className="font-display text-2xl tracking-[-0.02em] md:text-3xl">No open roles have been published.</p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
