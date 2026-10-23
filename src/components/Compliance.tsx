import { config } from "../config"

const c = config.compliance

export function NdpcStatement({ className = "" }: { className?: string }) {
  return (
    <p className={className}>
      {c.ndpcStatement} Registration ID: {c.ndpcId}.
      {c.ndpcCertificateUrl && (
        <>
          {" "}
          <a href={c.ndpcCertificateUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">View certificate</a>
        </>
      )}
    </p>
  )
}

export function CompanyContact({ tone = "light" }: { tone?: "light" | "dark" }) {
  const mute = tone === "dark" ? "text-white/50" : "text-near-black/50"
  return (
    <address className="not-italic text-[15px] leading-relaxed">
      <p className={`eyebrow ${mute}`}>Compliance contact</p>
      <p className="mt-3 font-medium">{c.entity}</p>
      <p>{c.address.join(", ")}</p>
      <p className="mt-2">
        <a href={`mailto:${c.email}`} className="underline underline-offset-4">{c.email}</a>
      </p>
    </address>
  )
}
