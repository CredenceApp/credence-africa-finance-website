import Nav from "../components/Nav"
import Footer from "../components/Footer"
import Button from "../components/Button"
import Photo from "../components/Photo"
import Reveal from "../components/Reveal"
import { img } from "../images"
import { EASE } from "../hooks"
import { getStarted, bookBriefing } from "../links"
import { NdpcStatement } from "../components/Compliance"

const connects = ["Merchants", "Trade opportunities", "Capital partners", "Transaction information", "Execution", "Settlement"]
const story = [
  ["Real economy trade", "Credence works with tangible commercial activity: commodity trade, supply chains, export contracts and procurement across African trade corridors."],
  ["Transaction structure", "Each opportunity is structured around identified buyers and suppliers, commercial terms, tenor, payment conditions and execution requirements."],
  ["Capital coordination", "Qualifying transactions are connected with capital partners whose requirements align with the transaction."],
  ["Operational visibility", "Execution is coordinated and tracked against agreed conditions and milestones through to settlement."],
  ["Credence Intelligence", "Operational and transaction data generated across the trade lifecycle becomes structured intelligence for financing decisions, risk monitoring and portfolio visibility."],
]
const places = [
  ["agriculture", "Agriculture & Commodities"],
  ["energy", "Energy"],
  ["minerals", "Solid Minerals"],
  ["border", "Cross Border Trade"],
] as const
const principles = [
  ["Structure before capital", "A transaction is defined, documented and assessable before capital is aligned to it."],
  ["Visibility through execution", "Payment controls, milestones and status are tracked from deployment through settlement."],
  ["Operational data becomes intelligence", "Information generated across the trade lifecycle is organised into structured records that support assessment and monitoring."],
]
const compliance = [
  ["KYC/KYB and due diligence", "As required: identity verification, beneficial ownership information, corporate records, source-of-funds information and counterparty due diligence."],
  ["Transaction verification", "Trade documents and commercial details are reviewed against the underlying transaction, alongside sanctions screening."],
  ["Structured monitoring", "Milestones, documentation and payment conditions are tracked through settlement."],
  ["Licensed banking infrastructure", "Payments are coordinated through licensed banking partners against agreed transaction conditions."],
  ["Data protection", "Personal data is handled under applicable data protection law."],
  ["AML/CFT and risk controls", "AML/CFT compliance and automated risk-scoring tools inform assessment, with human oversight where it matters."],
]
const rise = (d: number) => ({ animation: `rise .9s ${EASE} ${d}s both` })

export default function About() {
  return (
    <div id="top">
      <Nav />
      <main>
        <section className="relative flex min-h-[85svh] items-end overflow-hidden bg-near-black pt-40 pb-20 text-white md:pb-28">
          <div className="hairline-grid pointer-events-none absolute inset-0 opacity-40" />
          <div className="wrap relative">
            <p className="eyebrow text-white/55" style={rise(0)}>About Credence</p>
            <h1 className="mt-6 max-w-[52rem] text-[clamp(2.5rem,5.4vw,4.75rem)] leading-[1.02] tracking-[-0.04em]" style={rise(0.1)}>
              Infrastructure for structured real economy trade.
            </h1>
            <p className="mt-8 max-w-[36rem] text-base leading-relaxed text-white/65 md:text-[17px]" style={rise(0.2)}>
              Credence brings trade opportunities, transaction structure, capital and execution visibility into one operating framework.
            </p>
          </div>
        </section>

        <section className="section-y bg-warm-white text-near-black">
          <div className="wrap grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <Reveal className="lg:sticky lg:top-32 lg:self-start">
              <p className="eyebrow text-near-black/55">Company story</p>
              <h2 className="display-section mt-5">Trade that is real deserves finance that is structured.</h2>
            </Reveal>
            <div className="border-t border-near-black">
              {story.map(([t, d], i) => (
                <Reveal key={t} delay={i * 50}>
                  <div className="grid gap-3 border-b border-near-black/15 py-9 md:grid-cols-[3rem_1fr] md:gap-6 md:py-11">
                    <span className="eyebrow pt-1 text-near-black/45">0{i + 1}</span>
                    <div>
                      <h3 className="font-display text-2xl tracking-[-0.02em]">{t}</h3>
                      <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-near-black/65">{d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-y bg-deep-green text-white">
          <div className="wrap">
            <Reveal>
              <p className="eyebrow text-white/60">What Credence connects</p>
            </Reveal>
            <ol className="mt-14 grid gap-0 md:mt-20 md:grid-cols-3 md:gap-y-12 lg:grid-cols-6">
              {connects.map((t, i) => (
                <Reveal key={t} delay={i * 90}>
                  <li className="relative border-l border-white/25 pb-10 pl-6 md:border-l-0 md:border-t md:pb-0 md:pl-0 md:pr-4 md:pt-8">
                    <span className={`absolute -left-[5.5px] top-1 size-[11px] rounded-full md:-top-[5.5px] md:left-0 ${i === 2 ? "bg-orange" : "bg-white"}`} />
                    <p className="eyebrow text-white/50">0{i + 1}</p>
                    <p className="mt-2 font-display text-xl leading-tight tracking-[-0.02em]">{t}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className="section-y bg-near-black text-white">
          <div className="wrap">
            <Reveal>
              <p className="eyebrow text-white/55">Where we operate</p>
            </Reveal>
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {places.map(([k, t], i) => (
                <Reveal key={k} delay={i * 90}>
                  <Photo src={img(k, 800, 1100)} alt={t} className="flex aspect-[3/4] items-end" shade="from-near-black/90 via-near-black/20 to-transparent">
                    <p className="p-5 font-display text-xl leading-tight tracking-[-0.02em]">{t}</p>
                  </Photo>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-y bg-warm-white text-near-black">
          <div className="wrap">
            <Reveal>
              <p className="eyebrow text-near-black/55">How we think about trade finance</p>
            </Reveal>
            <div className="mt-12 border-t border-near-black">
              {principles.map(([t, d], i) => (
                <Reveal key={t} delay={i * 80}>
                  <div className="grid gap-4 border-b border-near-black/15 py-10 md:grid-cols-[6rem_1.1fr_1fr] md:items-baseline md:gap-10 md:py-14">
                    <span className="font-display text-5xl tracking-[-0.05em] text-near-black/20">0{i + 1}</span>
                    <h3 className="font-display text-[clamp(1.6rem,2.8vw,2.5rem)] leading-tight tracking-[-0.03em]">{t}</h3>
                    <p className="text-[16px] leading-relaxed text-near-black/65">{d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="compliance" className="section-y bg-stone text-near-black">
          <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <Reveal className="lg:sticky lg:top-32 lg:self-start">
              <p className="eyebrow text-near-black/55">Compliance and infrastructure</p>
              <h2 className="display-section mt-5">Structure, verification and controls come first.</h2>
              <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-near-black/65">
                Credence is a technology-enabled trade facilitation platform. It facilitates connections between merchants, buyers, sellers, financiers, capital partners and other transaction participants, and supports due diligence, structuring, verification, monitoring and execution oversight.
              </p>
            </Reveal>
            <div>
              <dl className="border-t border-near-black">
                {compliance.map(([t, d], i) => (
                  <Reveal key={t} delay={i * 50}>
                    <div className="grid gap-2 border-b border-near-black/15 py-6 md:grid-cols-[1fr_1.3fr] md:gap-10">
                      <dt className="font-display text-xl tracking-[-0.02em]">{t}</dt>
                      <dd className="text-[15px] leading-relaxed text-near-black/65">{d}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
              <NdpcStatement className="mt-8 max-w-xl text-sm leading-relaxed text-near-black/60" />
            </div>
          </div>
        </section>

        <section className="section-y bg-near-black text-white">
          <div className="wrap">
            <Reveal>
              <h2 className="display-section">Work with Credence.</h2>
            </Reveal>
            <Reveal delay={150} className="mt-10 flex flex-wrap gap-3">
              <Button variant="light" onClick={() => getStarted()}>Get Started</Button>
              <Button variant="outline-dark" onClick={bookBriefing}>
                Book a Briefing
              </Button>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
