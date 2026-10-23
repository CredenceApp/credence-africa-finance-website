import Reveal from "../components/Reveal"
import ReportGate from "../components/ReportGate"

export default function ReportDownload() {
  return (
    <section id="credence-report" className="scroll-mt-16 bg-warm-white py-12 text-near-black md:py-16">
      <div className="wrap">
        <Reveal className="flex flex-col gap-6 border-y border-near-black/15 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10 md:py-10">
          <div className="min-w-0">
            <p className="eyebrow text-green">Credence Intelligence</p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-none tracking-[-0.03em]">Credence Report</h2>
          </div>
          <ReportGate className="w-full sm:w-auto" label="Download report" />
        </Reveal>
      </div>
    </section>
  )
}
