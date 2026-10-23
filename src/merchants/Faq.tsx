import { useState } from "react"
import { Head } from "./parts"

type Faq = { q: string; lead: string; items?: string[]; tail?: string }
const faqs: Faq[] = [
  { q: "Who does Credence work with?", lead: "Credence works with commodity traders, suppliers, exporters, importers and other businesses executing identifiable trade transactions across Africa.", tail: "We work with businesses that have a defined commercial opportunity and require the right structure, capital and transaction support to execute it." },
  { q: "What types of transactions can I bring to Credence?", lead: "You can bring transactions involving:", items: ["Commodity purchases", "Supply contracts", "Purchase orders", "Inventory", "Pre-shipment requirements", "Exports", "Supply chain finance", "Other working-capital needs connected to real trade"] },
  { q: "What information is required to submit a transaction?", lead: "Credence typically requires information including:", items: ["Details of the trade", "Parties involved", "Commodity or goods", "Transaction value", "Funding requirement", "Expected tenor", "Purchase arrangement", "Sale arrangement", "Repayment route", "Supporting contracts, purchase orders and invoices", "Other relevant transaction documentation"] },
  { q: "How does Credence assess a transaction?", lead: "Credence assesses:", items: ["Commercial structure", "Counterparties", "Transaction economics", "Supporting documentation", "Trade flow", "Repayment route", "Relevant transaction risks"], tail: "Depending on the transaction, assessment may also include KYB/KYC, compliance checks, commercial due diligence and sector-specific due diligence." },
  { q: "How does Credence monitor transactions after execution?", lead: "Credence monitors agreed transaction milestones, documentation, payment conditions and other relevant execution indicators throughout the transaction lifecycle.", tail: "Credence coordinates updates, identifies exceptions and supports the transaction through settlement." },
  { q: "What sectors and markets does Credence support?", lead: "Credence focuses on real-economy trade across:", items: ["Agriculture & Commodities", "Energy", "Solid Minerals", "Cross-Border Trade"], tail: "Credence supports transactions across African markets, subject to the specific transaction, counterparties, applicable requirements and capital partner appetite." },
  { q: "What is the typical ticket size?", lead: "Financing limits range from approximately $10,000 for smaller-scale traders to $5 million+ for larger corporate transactions.", tail: "Actual limits depend on the business profile, trade history, creditworthiness and the specific transaction being financed. Limits may increase over time with successful repayment history. These figures describe a financing range only and are not a commitment to fund." },
  { q: "Do I need security?", lead: "Security requirements vary based on the transaction, deal size, risk profile and relationship history. Credence uses transaction and risk assessment models that may reduce reliance on traditional collateral structures. Depending on the transaction, security may include:", items: ["Underlying trade assets", "Digital guarantees", "Trade insurance", "Receivables", "Contractual cash flows", "Other transaction-specific security arrangements"] },
  { q: "What happens after I submit a transaction?", lead: "Credence reviews the opportunity and supporting information. Where suitable, Credence works with the merchant to:", items: ["Structure the transaction", "Complete required diligence", "Coordinate capital review", "Establish transaction documentation", "Establish payment and execution controls", "Prepare the transaction for execution"], tail: "The transaction is then monitored through execution and settlement. Submission does not guarantee approval or funding." },
  { q: "What is Credence Intelligence?", lead: "Credence Intelligence is the intelligence layer Credence is building around operational data generated across the trade lifecycle.", tail: "It is designed to turn transaction, counterparty, risk and portfolio data into structured intelligence that supports financing decisions, transaction monitoring, risk visibility and portfolio visibility." },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="section-y bg-warm-white text-near-black">
      <div className="wrap grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
        <Head eyebrow="FAQ" title="Questions merchants ask." className="lg:sticky lg:top-32 lg:self-start" />
        <div className="border-t border-near-black">
          {faqs.map(({ q, lead, items, tail }, i) => {
            const on = open === i
            return (
              <div key={q} className="border-b border-near-black/15">
                <button
                  aria-expanded={on}
                  onClick={() => setOpen(on ? null : i)}
                  className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-display text-lg tracking-[-0.02em] md:text-2xl">{q}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" className={`shrink-0 transition-transform duration-500 ${on ? "rotate-45" : ""}`} aria-hidden>
                    <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </button>
                <div className={`grid transition-all duration-500 ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="max-w-xl overflow-hidden text-[15px] leading-relaxed text-near-black/65">
                    <p>{lead}</p>
                    {items && (
                      <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
                        {items.map((it) => (
                          <li key={it} className="flex items-baseline gap-3 border-t border-near-black/10 py-2">
                            <span className="h-px w-3 shrink-0 translate-y-[-0.3em] bg-green" aria-hidden />
                            {it}
                          </li>
                        ))}
                      </ul>
                    )}
                    {tail && <p className="mt-4">{tail}</p>}
                    <div className="pb-6" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
