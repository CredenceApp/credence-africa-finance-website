import { useEffect, useRef, useState, type FormEvent } from "react"
import Button from "./Button"
import Turnstile from "./Turnstile"
import { config } from "../config"

const field = "mt-2 block w-full rounded-ui border border-near-black/25 bg-white px-4 py-3 text-base text-near-black outline-none transition-colors placeholder:text-near-black/35 focus:border-near-black"
const label = "eyebrow text-near-black/60"

type Status = "idle" | "sending" | "ready" | "error"

export default function ReportGate({ className = "", label: buttonLabel = "Download report" }: { className?: string; label?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<Status>("idle")
  const [token, setToken] = useState("")
  const [resetKey, setResetKey] = useState(0)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const close = () => {
    setOpen(false)
    setStatus("idle")
    setToken("")
    setResetKey((value) => value + 1)
    formRef.current?.reset()
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!token || !config.report.accessEndpoint) return
    setStatus("sending")

    const values = Object.fromEntries(new FormData(event.currentTarget))
    try {
      const response = await fetch(config.report.accessEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          industry: values.industry,
          isFinancier: values.isFinancier === "yes",
          consent: values.consent === "on",
          website: values.website,
          turnstileToken: token,
        }),
      })
      const result = (await response.json().catch(() => null)) as { data?: { downloadUrl?: string }; error?: string } | null
      if (!response.ok || !result?.data?.downloadUrl) throw new Error(result?.error || "Download unavailable")

      const download = document.createElement("a")
      download.href = new URL(result.data.downloadUrl, config.report.accessEndpoint).toString()
      download.rel = "noopener"
      document.body.appendChild(download)
      download.click()
      download.remove()
      setStatus("ready")
    } catch {
      setStatus("error")
      setToken("")
      setResetKey((value) => value + 1)
    }
  }

  return (
    <>
      <Button variant="primary" className={className} onClick={() => setOpen(true)}>
        {buttonLabel}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M7 1v9m0 0L3.5 6.5M7 10l3.5-3.5M1.5 13h11" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </Button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onCancel={(event) => {
          event.preventDefault()
          close()
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close()
        }}
        aria-labelledby="report-gate-title"
        aria-describedby="report-gate-description"
        className="m-auto max-h-[92svh] w-[min(94vw,48rem)] overflow-y-auto rounded-ui border border-white/15 bg-warm-white p-0 text-near-black shadow-2xl backdrop:bg-near-black/80"
      >
        <div className="grid md:grid-cols-[0.78fr_1.22fr]">
          <div className="bg-deep-green p-7 text-white md:p-9">
            <p className="eyebrow text-orange">Q4 2026</p>
            <h2 id="report-gate-title" className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.02] tracking-[-0.04em]">Credence Market Intelligence</h2>
            <p id="report-gate-description" className="mt-5 text-sm leading-relaxed text-white/65">A quarterly trade review for banks, DFIs and institutional capital providers.</p>
            <div className="mt-10 border-t border-white/15 pt-5 text-xs uppercase tracking-[0.13em] text-white/45">33 pages · Nigeria · PDF</div>
          </div>

          <div className="relative p-7 md:p-9">
            <button type="button" onClick={close} aria-label="Close report form" className="absolute right-4 top-4 flex size-11 items-center justify-center text-near-black/55 transition-colors hover:text-near-black">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden><path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.3" /></svg>
            </button>

            {status === "ready" ? (
              <div role="status" className="flex min-h-[30rem] flex-col justify-center">
                <p className="eyebrow text-green">Download started</p>
                <p className="mt-4 font-display text-3xl tracking-[-0.03em]">The report is on its way.</p>
                <p className="mt-3 text-sm leading-relaxed text-near-black/60">If your browser blocked the download, close this window and try again.</p>
                <Button type="button" variant="outline" className="mt-8 self-start" onClick={close}>Close</Button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} className="space-y-5">
                <div className="sr-only" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block"><span className={label}>Full name</span><input required name="name" autoComplete="name" minLength={2} maxLength={120} className={field} /></label>
                  <label className="block"><span className={label}>Work email</span><input required type="email" name="email" autoComplete="email" maxLength={254} className={field} /></label>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block"><span className={label}>Phone number</span><input required type="tel" name="phone" autoComplete="tel" minLength={7} maxLength={25} className={field} /></label>
                  <label className="block"><span className={label}>Industry</span><input required name="industry" autoComplete="organization-title" minLength={2} maxLength={120} placeholder="e.g. Banking" className={field} /></label>
                </div>
                <fieldset>
                  <legend className={label}>Do you work as a financier?</legend>
                  <div className="mt-2 flex gap-2">
                    {[['yes', 'Yes'], ['no', 'No']].map(([value, text]) => (
                      <label key={value} className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-ui border border-near-black/25 px-4 text-sm transition-colors has-[:checked]:border-near-black has-[:checked]:bg-near-black has-[:checked]:text-white">
                        <input required type="radio" name="isFinancier" value={value} className="sr-only" />{text}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label className="flex items-start gap-3 text-sm leading-relaxed text-near-black/65">
                  <input required type="checkbox" name="consent" className="mt-1 size-4 accent-green" />
                  <span>I agree that Credence may use these details to provide the report and follow up about relevant services. See the <a href="#/privacy" className="underline underline-offset-4">Privacy Policy</a>.</span>
                </label>
                <Turnstile siteKey={config.turnstileSiteKey} action="report_download" onToken={setToken} resetKey={resetKey} />
                {status === "error" && <p role="alert" className="border-l-2 border-orange pl-4 text-sm leading-relaxed text-near-black/70">We could not prepare the download. Please complete the verification and try again.</p>}
                <Button type="submit" variant="primary" className="w-full" disabled={status === "sending" || !token || !config.turnstileSiteKey}>
                  {status === "sending" ? "Preparing download…" : "Submit and download"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </dialog>
    </>
  )
}
