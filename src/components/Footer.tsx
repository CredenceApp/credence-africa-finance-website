import Logo from "./Logo"
import { openPreferences } from "../consent"
import { config } from "../config"
import { reportAvailable } from "../links"

const cols = [
  {
    title: "Solutions",
    items: ["Credence for Merchants", "Credence for Financiers", "Credence Intelligence", "Credence Report"],
  },
  { title: "Company", items: ["About Us", "Contact Us", "Careers", "LinkedIn", "X"] },
  {
    title: "Legal",
    items: [
      "Terms and Conditions",
      "Privacy Policy",
      "Cookie Policy",
      "Website Disclaimer",
      "Information Security Policy",
      "AML/CFT/CPF Policy",
    ],
  },
]

const hrefs: Record<string, string> = {
  "Credence for Merchants": "#/merchants",
  "Credence for Financiers": "#/financiers",
  "Credence Intelligence": "#/intelligence",
  ...(reportAvailable ? { "Credence Report": config.report.pageUrl } : {}),
  "About Us": "#/about",
  "Contact Us": "#/contact",
  Careers: "#/careers",
  LinkedIn: config.social.linkedin,
  X: config.social.x,
  "Terms and Conditions": "#/terms",
  "Privacy Policy": "#/privacy",
  "Cookie Policy": "#/cookies",
  // "Information Security Policy" and "AML/CFT/CPF Policy" stay unlinked (hidden) until approved content is supplied.
  "Website Disclaimer": "#/disclaimer",
}

export default function Footer() {
  return (
    <footer className="bg-near-black text-white">
      <div className="wrap pt-20 pb-10 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-12 lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/55">
              Trade finance infrastructure for African real economy trade.
            </p>
          </div>
          {cols.map((c, i) => (
            <div key={c.title} className={`md:col-span-4 ${i === 2 ? "lg:col-span-3" : "lg:col-span-2"} ${i === 0 ? "lg:col-start-6" : ""}`}>
              <h2 className="eyebrow text-white/40" style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.14em" }}>
                {c.title}
              </h2>
              <ul className="mt-5 space-y-0.5">
                {c.items.filter((it) => hrefs[it]).map((it) => {
                  const href = hrefs[it]
                  const external = /^https?:\/\//i.test(href)
                  return (
                    <li key={it}>
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="flex min-h-11 items-center text-sm text-white/75 transition-colors hover:text-white"
                      >
                        {it}
                      </a>
                    </li>
                  )
                })}
                {c.title === "Legal" && (
                  <li>
                    <button onClick={openPreferences} className="flex min-h-11 items-center text-sm text-white/75 transition-colors hover:text-white">
                      Cookie Preferences
                    </button>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-20 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <span>&copy;2026 Credence Charter Limited</span>
          <a href="#/privacy" className="max-w-md leading-relaxed transition-colors hover:text-white/70">
            Registered Data Controller / Processor of Major Importance with the Nigeria Data Protection Commission. ID {config.compliance.ndpcId}.
          </a>
        </div>
      </div>
    </footer>
  )
}
