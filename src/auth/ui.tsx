import { useId, useState, type ReactNode } from "react"
import { buttonClasses } from "../components/Button"

export const fieldCls = (invalid: boolean) =>
  `block w-full rounded-ui border bg-transparent px-4 py-3 text-base text-near-black outline-none transition-colors placeholder:text-near-black/35 focus:border-near-black focus-visible:ring-2 focus-visible:ring-green/40 ${
    invalid ? "border-orange" : "border-near-black/25"
  }`

type FieldProps = {
  label: string
  name: string
  type?: string
  value: string
  onChange: (v: string) => void
  onBlur?: () => void
  error?: string
  hint?: string
  autoComplete?: string
  required?: boolean
  options?: readonly string[]
}

export function Wrap({ id, label, error, hint, children, action }: { id: string; label: string; error?: string; hint?: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="eyebrow text-near-black/65">
          {label}
        </label>
        {action}
      </div>
      <div className="mt-2">{children}</div>
      {hint && !error && (
        <p id={`${id}-d`} className="mt-2 text-sm text-near-black/55">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-d`} className="mt-2 border-l-2 border-orange pl-3 text-sm leading-snug text-near-black/80">
          {error}
        </p>
      )}
    </div>
  )
}

export function Field({ label, name, type = "text", value, onChange, onBlur, error, hint, autoComplete, required = true, options }: FieldProps) {
  const id = useId()
  const common = {
    id,
    name,
    required,
    value,
    onBlur,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error || hint ? `${id}-d` : undefined,
    autoComplete,
    className: fieldCls(Boolean(error)),
  }
  return (
    <Wrap id={id} label={label} error={error} hint={hint}>
      {options ? (
        <select {...common} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input {...common} type={type} onChange={(e) => onChange(e.target.value)} spellCheck={false} autoCapitalize={type === "email" ? "none" : undefined} />
      )}
    </Wrap>
  )
}

export function PasswordField({ label, name, value, onChange, onBlur, error, hint, autoComplete, action }: Omit<FieldProps, "type" | "options" | "required"> & { action?: ReactNode }) {
  const id = useId()
  const [show, setShow] = useState(false)
  return (
    <Wrap id={id} label={label} error={error} hint={hint} action={action}>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={show ? "text" : "password"}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? `${id}-d` : undefined}
          className={`${fieldCls(Boolean(error))} pr-20`}
          autoCapitalize="none"
          spellCheck={false}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-pressed={show}
          aria-controls={id}
          className="absolute inset-y-0 right-0 flex min-w-16 items-center justify-center px-3 text-sm text-near-black/65 outline-none transition-colors hover:text-near-black focus-visible:ring-2 focus-visible:ring-green/40"
        >
          {show ? "Hide" : "Show"}
          <span className="sr-only"> password</span>
        </button>
      </div>
    </Wrap>
  )
}

export function Notice({ children, live = "alert" }: { children: ReactNode; live?: "alert" | "status" }) {
  return (
    <div role={live} className="border-l-2 border-orange bg-stone/60 py-3 pl-4 pr-3 text-[15px] leading-relaxed text-near-black/80">
      {children}
    </div>
  )
}

export const LinkButton = ({ href, variant = "primary", children, className = "" }: { href: string; variant?: Parameters<typeof buttonClasses>[0]; children: ReactNode; className?: string }) => (
  <a href={href} className={buttonClasses(variant, className)}>
    {children}
  </a>
)

export const TextLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} className="text-near-black underline decoration-near-black/35 underline-offset-4 transition-colors hover:decoration-near-black">
    {children}
  </a>
)

export function StatusPanel({ eyebrow, title, children, actions }: { eyebrow: string; title: string; children?: ReactNode; actions?: ReactNode }) {
  return (
    <div role="status" className="border border-near-black/20 px-6 py-10 md:px-8">
      <p className="eyebrow text-green">{eyebrow}</p>
      <h2 className="mt-4 font-display text-[clamp(1.6rem,2.6vw,2rem)] leading-tight tracking-[-0.03em]">{title}</h2>
      {children && <div className="mt-3 max-w-md text-[15px] leading-relaxed text-near-black/65">{children}</div>}
      {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
    </div>
  )
}

export function Steps({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex flex-wrap gap-x-5 gap-y-1 text-xs uppercase tracking-[0.1em]" aria-label="Onboarding progression">
      {steps.map((s, i) => (
        <li key={s} aria-current={i === current ? "step" : undefined} className={`flex items-center gap-2 ${i === current ? "text-near-black" : "text-near-black/40"}`}>
          <span className={`size-1.5 rounded-full ${i === current ? "bg-orange" : "bg-near-black/25"}`} aria-hidden />
          {s}
        </li>
      ))}
    </ol>
  )
}

/* ---------- Password requirements ---------- */

export const passwordRules = (min: number) => [
  { id: "len", label: `At least ${min} characters`, test: (v: string) => v.length >= min },
  { id: "upper", label: "One uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { id: "num", label: "One number", test: (v: string) => /\d/.test(v) },
  { id: "sym", label: "One special character", test: (v: string) => /[^A-Za-z0-9\s]/.test(v) },
]

export function PasswordRequirements({ id, value, min }: { id: string; value: string; min: number }) {
  return (
    <ul id={id} aria-label="Password requirements" className="mt-3 grid gap-x-4 gap-y-1.5 sm:grid-cols-2">
      {passwordRules(min).map((r) => {
        const ok = r.test(value)
        return (
          <li key={r.id} className={`flex items-center gap-2 text-sm transition-colors ${ok ? "text-green" : "text-near-black/55"}`}>
            <svg viewBox="0 0 16 16" className="size-3.5 shrink-0" fill="none" aria-hidden>
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeOpacity={ok ? 1 : 0.4} />
              {ok && <path d="M5 8.2l2 2L11 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />}
            </svg>
            {r.label}
            <span className="sr-only">{ok ? " (met)" : " (not met)"}</span>
          </li>
        )
      })}
    </ul>
  )
}

/* ---------- Phone with country code ---------- */

export const countries = [
  { code: "+234", name: "Nigeria", iso: "NG" },
  { code: "+233", name: "Ghana", iso: "GH" },
  { code: "+254", name: "Kenya", iso: "KE" },
  { code: "+27", name: "South Africa", iso: "ZA" },
  { code: "+225", name: "Côte d'Ivoire", iso: "CI" },
  { code: "+221", name: "Senegal", iso: "SN" },
  { code: "+255", name: "Tanzania", iso: "TZ" },
  { code: "+256", name: "Uganda", iso: "UG" },
  { code: "+20", name: "Egypt", iso: "EG" },
  { code: "+212", name: "Morocco", iso: "MA" },
  { code: "+971", name: "UAE", iso: "AE" },
  { code: "+44", name: "UK", iso: "GB" },
  { code: "+1", name: "US / Canada", iso: "US" },
] as const

export const normalisePhone = (code: string, national: string) => `${code}${national.replace(/\D/g, "").replace(/^0+/, "")}`
export const phoneDigits = (national: string) => national.replace(/\D/g, "").replace(/^0+/, "")

export function PhoneField({ label, name, code, onCode, value, onChange, onBlur, error, hint }: { label: string; name: string; code: string; onCode: (c: string) => void; value: string; onChange: (v: string) => void; onBlur?: () => void; error?: string; hint?: string }) {
  const id = useId()
  return (
    <Wrap id={id} label={label} error={error} hint={hint}>
      <div className="flex gap-2">
        <select
          aria-label="Country code"
          name={`${name}Code`}
          value={code}
          onChange={(e) => onCode(e.target.value)}
          autoComplete="tel-country-code"
          className={`${fieldCls(Boolean(error))} w-[8.5rem]! shrink-0 px-3`}
        >
          {countries.map((c) => (
            <option key={c.name} value={c.code} title={c.name}>
              {c.iso} {c.code}
            </option>
          ))}
        </select>
        <input
          id={id}
          name={name}
          type="tel"
          inputMode="tel"
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          autoComplete="tel-national"
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? `${id}-d` : undefined}
          placeholder="801 234 5678"
          className={`${fieldCls(Boolean(error))} w-auto! min-w-0 flex-1`}
        />
      </div>
    </Wrap>
  )
}
