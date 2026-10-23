import { useRef, useState, type FormEvent, type ReactNode } from "react"
import Button from "../components/Button"
import { config } from "../config"
import { Field, Notice, PasswordField, PasswordRequirements, PhoneField, normalisePhone, passwordRules, phoneDigits } from "./ui"
import { useAuthRequest, type AuthStatus, type Endpoint } from "./useAuth"

export type FieldDef = {
  name: string
  label: string
  kind?: "text" | "email" | "phone" | "password" | "newPassword" | "confirm" | "select"
  autoComplete?: string
  options?: readonly string[]
  hint?: string
  labelAction?: ReactNode
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const defaults: Record<string, string> = {
  invalid: "Some details could not be accepted. Please review the form and try again.",
  error: "Something went wrong and your request has not been completed. Check your connection and try again.",
  rejected: "We could not complete this request with the details provided. Please check them and try again.",
}

export default function AuthForm({
  fields,
  endpoint,
  extra = {},
  submitLabel,
  sendingLabel,
  unavailable,
  messages = {},
  footer,
  variant = "primary",
  onDone,
}: {
  variant?: "primary" | "accent"
  fields: FieldDef[]
  endpoint: Endpoint
  extra?: Record<string, string>
  submitLabel: string
  sendingLabel: string
  unavailable: string
  messages?: Partial<Record<AuthStatus, ReactNode>>
  footer?: ReactNode
  onDone: (status: AuthStatus, payload: Record<string, string>) => void
}) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [codes, setCodes] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = useState(false)
  const { status, send } = useAuthRequest(endpoint)
  const formRef = useRef<HTMLFormElement>(null)

  const min = config.auth.passwordMinLength
  const errorOf = (f: FieldDef): string | undefined => {
    const v = values[f.name] ?? ""
    const k = f.kind ?? "text"
    if (!v.trim()) return k === "select" ? `Select ${f.label.toLowerCase()}.` : `Enter ${f.label.toLowerCase()}.`
    if (k === "email" && !EMAIL.test(v.trim())) return "Enter a valid email address, for example name@company.com."
    if (k === "phone" && (phoneDigits(v).length < 6 || phoneDigits(v).length > 12 || /[^\d\s()+.-]/.test(v))) return "Enter a valid phone number, without the country code."
    if (k === "newPassword") {
      const unmet = passwordRules(min).filter((r) => !r.test(v))
      if (unmet.length) return "Your password does not meet all the requirements below."
    }
    if (k === "confirm" && v !== (values.password ?? "")) return "The passwords do not match."
    return undefined
  }
  const show = (f: FieldDef) => (submitted || touched[f.name] ? errorOf(f) : undefined)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const bad = fields.find((f) => errorOf(f))
    if (bad) {
      formRef.current?.querySelector<HTMLElement>(`[name="${bad.name}"]`)?.focus()
      return
    }
    const payload: Record<string, string> = { ...extra }
    for (const f of fields) {
      if (f.kind === "confirm") continue
      if (f.kind === "phone") {
        payload[f.name] = normalisePhone(codes[f.name] ?? "+234", values[f.name] ?? "")
        continue
      }
      const raw = values[f.name] ?? ""
      payload[f.name] = f.kind === "password" || f.kind === "newPassword" ? raw : raw.trim()
    }
    const result = await send(payload)
    if (result === "ok") onDone(result, payload)
  }

  const note: ReactNode = status === "unavailable" ? unavailable : (messages[status] ?? defaults[status])

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5" aria-busy={status === "sending"}>
      {fields.map((f) => {
        const k = f.kind ?? "text"
        const common = {
          name: f.name,
          label: f.label,
          value: values[f.name] ?? "",
          onChange: (v: string) => setValues((s) => ({ ...s, [f.name]: v })),
          onBlur: () => setTouched((s) => ({ ...s, [f.name]: true })),
          error: show(f),
          hint: f.hint,
          autoComplete: f.autoComplete,
        }
        if (k === "phone")
          return <PhoneField key={f.name} {...common} code={codes[f.name] ?? "+234"} onCode={(c) => setCodes((s) => ({ ...s, [f.name]: c }))} />
        if (k === "newPassword")
          return (
            <div key={f.name}>
              <PasswordField {...common} />
              <PasswordRequirements id={`${f.name}-req`} value={values[f.name] ?? ""} min={min} />
            </div>
          )
        return k === "password" || k === "confirm" ? (
          <PasswordField key={f.name} {...common} hint={f.hint} action={f.labelAction} />
        ) : (
          <Field key={f.name} {...common} type={k === "email" ? "email" : "text"} options={f.options} />
        )
      })}
      {note && ["unavailable", "invalid", "error", "rejected", "conflict", "expired"].includes(status) && <Notice>{note}</Notice>}
      <Button type="submit" variant={variant} disabled={status === "sending"} className="w-full disabled:opacity-60">
        {status === "sending" ? sendingLabel : submitLabel}
      </Button>
      {footer}
    </form>
  )
}
