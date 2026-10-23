import { useEffect, useState, type FormEvent } from "react"
import Nav from "../components/Nav"
import { CompanyContact } from "../components/Compliance"
import Footer from "../components/Footer"
import Button from "../components/Button"
import Reveal from "../components/Reveal"
import { config } from "../config"
import Turnstile from "../components/Turnstile"

const roles = ["Merchant", "Capital Partner", "Other"] as const
type Role = (typeof roles)[number]

const field = "mt-2 block w-full rounded-ui border border-near-black/25 bg-transparent px-4 py-3 text-base text-near-black outline-none transition-colors placeholder:text-near-black/35 focus:border-near-black"
const label = "eyebrow text-near-black/60"

const details = ([["Email", config.contact.email], ["Phone", config.contact.phone], ["Office", config.contact.office]] as const).filter(([, v]) => v)
const hasDetails = details.length > 0

export default function Contact() {
  const [role, setRole] = useState<Role | "">("")
  const [subject, setSubject] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "unavailable">("idle")
  const [turnstileToken, setTurnstileToken] = useState("")
  const [turnstileResetKey, setTurnstileResetKey] = useState(0)

  const pick = (r: Role, s: string) => {
    setRole(r)
    setSubject(s)
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  useEffect(() => {
    const apply = () => {
      const intent = new URLSearchParams(window.location.hash.split("?")[1] ?? "").get("intent")
      if (intent === "merchant") pick("Merchant", "Trade opportunity")
      else if (intent === "capital") pick("Capital Partner", "Briefing request")
      else return
      setTimeout(() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" }), 120)
    }
    apply()
    window.addEventListener("hashchange", apply)
    return () => window.removeEventListener("hashchange", apply)
  }, [])
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!config.formEndpoint) {
      setStatus("unavailable")
      return
    }
    setStatus("sending")
    try {
      const res = await fetch(config.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(e.currentTarget)), turnstileToken }),
      })
      setStatus(res.ok ? "sent" : "error")
      if (!res.ok) {
        setTurnstileToken("")
        setTurnstileResetKey((value) => value + 1)
      }
    } catch {
      setStatus("error")
      setTurnstileToken("")
      setTurnstileResetKey((value) => value + 1)
    }
  }

  return (
    <div id="top">
      <Nav />
      <main>
        <section className="bg-near-black pt-40 pb-20 text-white md:pb-28">
          <div className="wrap">
            <p className="eyebrow text-white/55">Contact</p>
            <h1 className="mt-6 max-w-[48rem] text-[clamp(2.5rem,5.4vw,4.75rem)] leading-[1.02] tracking-[-0.04em]">Start the right conversation.</h1>
          </div>
        </section>

        <section className="bg-warm-white text-near-black">
          <div className="wrap grid border-b border-near-black/15 md:grid-cols-2">
            {[
              ["Merchant", "I have a trade opportunity.", "Talk to Credence", "Merchant" as Role, "Trade opportunity", "primary" as const],
              ["Capital partner", "I want to discuss deployment or origination.", "Book a Briefing", "Capital Partner" as Role, "Briefing request", "outline" as const],
            ].map(([k, d, cta, r, s, v], i) => (
              <Reveal key={k as string} delay={i * 100} className={`py-12 md:py-20 ${i === 0 ? "md:border-r md:border-near-black/15 md:pr-12" : "md:pl-12"}`}>
                <p className="eyebrow text-near-black/55">{k as string}</p>
                <p className="mt-4 max-w-sm font-display text-[clamp(1.6rem,2.6vw,2.25rem)] leading-tight tracking-[-0.03em]">{d as string}</p>
                <Button variant={v as "primary" | "outline"} className="mt-8" onClick={() => pick(r as Role, s as string)}>
                  {cta as string}
                </Button>
              </Reveal>
            ))}
          </div>

          <div className={`wrap grid gap-16 py-20 md:py-28 ${hasDetails ? "lg:grid-cols-[1.4fr_0.8fr] lg:gap-28" : "lg:max-w-[52rem]"}`}>
            <div id="contact-form" className="scroll-mt-28">
              {status === "sent" ? (
                <div role="status" className="border border-near-black/25 px-8 py-14">
                  <p className="eyebrow text-green">Submitted</p>
                  <p className="mt-4 font-display text-3xl tracking-[-0.03em]">Thank you.</p>
                  <p className="mt-3 max-w-md text-[16px] leading-relaxed text-near-black/65">Your enquiry has been submitted. Credence will follow up using the work email you provided.</p>
                  <Button variant="outline" className="mt-8" onClick={() => setStatus("idle")}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-7">
                  <div className="sr-only" aria-hidden="true">
                    <label>
                      Website
                      <input name="website" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>
                  <div className="grid gap-7 md:grid-cols-2">
                    <label className="block">
                      <span className={label}>Full name</span>
                      <input required name="name" autoComplete="name" className={field} />
                    </label>
                    <label className="block">
                      <span className={label}>Work email</span>
                      <input required type="email" name="email" autoComplete="email" className={field} />
                    </label>
                  </div>
                  <label className="block">
                    <span className={label}>Organisation</span>
                    <input required name="organisation" autoComplete="organization" className={field} />
                  </label>
                  <fieldset>
                    <legend className={label}>I am a</legend>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {roles.map((r) => (
                        <label key={r} className={`cursor-pointer rounded-ui border px-4 py-2.5 min-h-11 inline-flex items-center text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 ${role === r ? "border-near-black bg-near-black text-white" : "border-near-black/25 hover:border-near-black"}`}>
                          <input type="radio" name="role" value={r} required checked={role === r} onChange={() => setRole(r)} className="sr-only" />
                          {r}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <label className="block">
                    <span className={label}>Subject</span>
                    <input required name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className={field} />
                  </label>
                  <label className="block">
                    <span className={label}>Message</span>
                    <textarea required name="message" rows={6} className={field} />
                  </label>
                  <p className="text-sm text-near-black/55">Please do not include sensitive financial information in this form.</p>
                  <Turnstile siteKey={config.turnstileSiteKey} action="contact_form" onToken={setTurnstileToken} resetKey={turnstileResetKey} />
                  {(status === "unavailable" || status === "error") && (
                    <p role="alert" className="border-l-2 border-orange pl-4 text-[15px] leading-relaxed text-near-black/75">
                      {status === "unavailable"
                        ? "This form is not connected yet, so your message has not been sent."
                        : "Something went wrong and your message has not been sent. Please try again."}
                    </p>
                  )}
                  <Button type="submit" variant="primary" disabled={status === "sending" || !turnstileToken || !config.turnstileSiteKey} className="disabled:opacity-60">
                    {status === "sending" ? "Sending…" : "Send message"}
                  </Button>
                </form>
              )}
            </div>

            {hasDetails && (
            <aside className="border-t border-near-black pt-6 lg:border-t-0 lg:pt-0">
              <p className="eyebrow text-near-black/55">Contact details</p>
              <dl className="mt-6 space-y-6 text-[16px]">
                {details.map(([k, v]) => (
                  <div key={k} className="border-b border-near-black/12 pb-4">
                    <dt className="eyebrow text-near-black/45">{k}</dt>
                    <dd className="mt-2 text-near-black/70">
                      {k === "Email" ? (
                        <a href={`mailto:${v}`} className="underline decoration-near-black/30 underline-offset-4 hover:decoration-near-black">{v}</a>
                      ) : k === "Phone" ? (
                        <a href={`tel:${v.replace(/\s/g, "")}`} className="underline decoration-near-black/30 underline-offset-4 hover:decoration-near-black">{v}</a>
                      ) : v}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
            )}
            {!hasDetails && (
              <aside className="border-t border-near-black pt-6 lg:border-t-0 lg:pt-0">
                <CompanyContact />
              </aside>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
