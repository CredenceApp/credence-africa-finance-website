import { useEffect, useState } from "react"
import Logo from "./Logo"
import Button from "./Button"
import { getStarted, signIn } from "../links"

const links = [
  { label: "Credence Intelligence", href: "#/intelligence" },
  { label: "About", href: "#/about" },
  { label: "Contact", href: "#/contact" },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [solutions, setSolutions] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      setSolutions(false)
      setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const linkCls = "flex min-h-11 items-center whitespace-nowrap text-sm text-white/75 transition-colors hover:text-white"

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled || open
          ? "border-white/10 bg-near-black/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between">
        <a href="#/" aria-label="Credence home" onClick={() => window.scrollTo(0, 0)}>
          <Logo />
        </a>

        <nav className="hidden items-center gap-7 xl:gap-9 lg:flex" aria-label="Primary">
          <div
            className="relative"
            onMouseEnter={() => setSolutions(true)}
            onMouseLeave={() => setSolutions(false)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setSolutions(false)
            }}
          >
            <button
              className={`${linkCls} flex min-h-11 items-center gap-1.5`}
              aria-expanded={solutions}
              aria-haspopup="true"
              onClick={() => setSolutions(true)}
              onFocus={() => setSolutions(true)}
            >
              Solutions
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
            {solutions && (
              <div className="absolute left-1/2 top-full w-60 -translate-x-1/2 pt-1">
                <div className="rounded-ui border border-white/10 bg-charcoal p-1.5 shadow-2xl shadow-black/40">
                  {[
                    ["For Merchants", "Structure and present trade for financing", "#/merchants"],
                    ["For Financiers", "Review and monitor structured transactions", "#/financiers"],
                  ].map(([t, d, href]) => (
                    <a
                      key={t}
                      href={href}
                      className="block rounded-md px-3 py-2.5 transition-colors hover:bg-white/5"
                    >
                      <span className="block text-sm text-white">{t}</span>
                      <span className="mt-0.5 block text-xs text-white/50">{d}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          {links.map((l) => (
            <a key={l.label} href={l.href} className={linkCls}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="text" className="text-white" onClick={() => signIn()}>
            Sign in
          </Button>
          <Button variant="light" onClick={() => getStarted()}>Get Started</Button>
        </div>

        <button
          className="flex size-11 items-center justify-center text-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden>
            {open ? (
              <path d="M2 1l16 12M18 1L2 13" stroke="currentColor" strokeWidth="1.4" />
            ) : (
              <path d="M0 1h20M0 7h20M0 13h20" stroke="currentColor" strokeWidth="1.4" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="wrap max-h-[calc(100svh-4rem)] overflow-y-auto pb-6 lg:hidden">
          <div className="flex flex-col border-t border-white/10">
            {["For Merchants", "For Financiers", ...links.map((l) => l.label)].map((t) => (
              <a
                key={t}
                href={t === "For Financiers" ? "#/financiers" : t === "For Merchants" ? "#/merchants" : t === "Credence Intelligence" ? "#/intelligence" : t === "About" ? "#/about" : t === "Contact" ? "#/contact" : "#"}
                className="flex min-h-12 items-center border-b border-white/10 text-base text-white/85"
                onClick={() => setOpen(false)}
              >
                {t}
              </a>
            ))}
          </div>
          <div className="mt-5 flex gap-3">
            <Button variant="outline-dark" className="flex-1" onClick={() => { setOpen(false); signIn() }}>
              Sign in
            </Button>
            <Button variant="light" className="flex-1" onClick={() => { setOpen(false); getStarted() }}>
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
