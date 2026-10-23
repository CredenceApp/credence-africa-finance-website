import { useInView, EASE } from "../hooks"
import { Head } from "./parts"

const inputs = ["Transaction activity", "Documentation", "Counterparty records", "Milestones", "Execution and settlement events"]

export default function MerIntel() {
  const [ref, seen] = useInView<HTMLDivElement>(0.3)
  return (
    <section className="section-y bg-deep-green text-white">
      <div className="wrap">
        <Head
          eyebrow="Credence Intelligence"
          title="Your trade generates useful operational intelligence."
          copy="Credence Intelligence helps organise operational data around trade activity."
          dark
        />
        <div ref={ref} className="mt-16 grid items-center gap-8 md:mt-24 lg:grid-cols-[1fr_auto_1fr] lg:gap-0">
          <ul>
            {inputs.map((t, i) => (
              <li key={t} className="flex items-center gap-4 border-b border-white/12 py-4" style={{ opacity: seen ? 1 : 0, transform: seen ? "none" : "translateX(-16px)", transition: `all .8s ${EASE} ${i * 0.12}s` }}>
                <span className="font-display text-lg tracking-[-0.01em] md:text-xl">{t}</span>
                <span className="hidden h-px flex-1 origin-left bg-green lg:block" style={{ transform: `scaleX(${seen ? 1 : 0})`, transition: `transform 1s ${EASE} ${0.5 + i * 0.12}s` }} />
              </li>
            ))}
          </ul>
          <span className="hidden h-[19rem] w-px bg-green lg:block" />
          <div className="border border-white/40 bg-black/20 p-6 md:p-8 lg:ml-0" style={{ opacity: seen ? 1 : 0, transition: `opacity 1s ${EASE} 1.2s` }}>
            <p className="eyebrow text-white">Structured business and transaction record</p>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/70">Documentation, counterparties, milestones and settlement events held together in one record.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
