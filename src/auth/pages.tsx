import { useEffect, useRef, useState, type ReactNode } from "react"
import Button from "../components/Button"
import { config } from "../config"
import { authHref, goto, knownAudience, rememberAudience, type Audience } from "../links"
import AuthForm from "./AuthForm"
import AuthShell from "./AuthShell"
import { LinkButton, Notice, StatusPanel, TextLink } from "./ui"
import { audienceOf, useAuthRequest, useHashQuery } from "./useAuth"

const label = (a?: Audience) => (a === "financier" ? "Financier" : "Merchant")
const other = (a: Audience): Audience => (a === "merchant" ? "financier" : "merchant")
const withType = (path: string, a?: Audience) => `#/auth/${path}${a ? `?type=${a}` : ""}`
const EMAIL_KEY = "credence.pendingEmail"
// Holds the address shown on the check-inbox screen for this tab session only. Never a credential.
const setPendingEmail = (e: string) => {
  try {
    sessionStorage.setItem(EMAIL_KEY, e)
  } catch {
    /* storage unavailable */
  }
}
const getPendingEmail = () => {
  try {
    return sessionStorage.getItem(EMAIL_KEY) ?? ""
  } catch {
    return ""
  }
}

const Meta = ({ children }: { children: ReactNode }) => <p className="mt-6 text-sm leading-relaxed text-near-black/60">{children}</p>

/* ---------- Account type selection ---------- */

const options: Record<Audience, { audience: string; title: string; body: string; who: string; signUp: string; signIn: string; tag: string }> = {
  merchant: {
    audience: "Merchants",
    title: "Structure and move your trade forward.",
    body: "Present your trade opportunity, organise transaction information and move through the Credence process with greater visibility.",
    who: "For commodity traders and merchants.",
    signUp: "Create Merchant Account",
    signIn: "Merchant Sign In",
    tag: "Your trade, from opportunity through execution.",
  },
  financier: {
    audience: "Financiers",
    title: "Access structured trade opportunities.",
    body: "Review structured real economy trade opportunities and access transaction information designed to support institutional capital decisions.",
    who: "For institutional capital partners.",
    signUp: "Create Financier Account",
    signIn: "Financier Sign In",
    tag: "Structured trade intelligence for capital decisions.",
  },
}

function Choice({ mode }: { mode: "sign-up" | "sign-in" }) {
  return (
    <div className="space-y-4">
      {(["merchant", "financier"] as const).map((a) => {
        const o = options[a]
        return (
          <section key={a} aria-labelledby={`choice-${a}`} className="border border-near-black/20 p-6 transition-colors hover:border-near-black/50 md:p-7">
            <p className="eyebrow flex items-center gap-3 text-near-black/60">
              {a === "financier" && <span className="size-1.5 rounded-full bg-orange" aria-hidden />}
              {o.audience}
            </p>
            <h2 id={`choice-${a}`} className="mt-4 font-display text-[clamp(1.35rem,2vw,1.6rem)] leading-tight tracking-[-0.03em]">
              {mode === "sign-up" ? o.title : o.tag}
            </h2>
            {mode === "sign-up" && <p className="mt-3 text-[15px] leading-relaxed text-near-black/65">{o.body}</p>}
            <p className="mt-3 text-sm text-near-black/55">{o.who}</p>
            <LinkButton href={authHref(mode, a)} variant={a === "merchant" ? "primary" : "outline"} className="mt-6 w-full sm:w-auto">
              {mode === "sign-up" ? o.signUp : o.signIn}
            </LinkButton>
          </section>
        )
      })}
      <Meta>
        {mode === "sign-up" ? (
          <>
            Already have an account? <TextLink href="#/auth?mode=signin">Sign in</TextLink>
          </>
        ) : (
          <>
            New to Credence? <TextLink href="#/auth?mode=signup">Create an account</TextLink>
          </>
        )}
      </Meta>
    </div>
  )
}

export function AuthChoice() {
  const q = useHashQuery()
  const mode = q.get("mode") === "signup" ? "sign-up" : "sign-in"
  const known = knownAudience()
  useEffect(() => {
    // Role already known: skip selection. replace() keeps /auth out of history so Back never loops.
    if (known) window.location.replace(authHref(mode, known))
  }, [known, mode])
  if (known) return null
  return (
    <AuthShell title={mode === "sign-up" ? "Create your Credence account" : "Sign in to Credence"} intro={mode === "sign-up" ? "Choose the account type that matches how you work with Credence." : "Choose your account type to continue."}>
      <Choice mode={mode} />
    </AuthShell>
  )
}

/* ---------- Registration ---------- */

const SwitchLine = ({ a, kind }: { a: Audience; kind: "sign-up" | "sign-in" }) => (
  <p className="text-sm leading-relaxed text-near-black/60">
    {kind === "sign-up" ? (
      <>
        Already have an account? <TextLink href={authHref("sign-in", a)}>{label(a)} Sign In</TextLink>
      </>
    ) : (
      <>
        New to Credence? <TextLink href={authHref("sign-up", a)}>Create a {label(a)} account</TextLink>
      </>
    )}
    <br />
    <TextLink href={authHref(kind, other(a))}>
      {kind === "sign-up" ? `Registering as a ${label(other(a)).toLowerCase()}?` : `Signing in as a ${label(other(a)).toLowerCase()}?`}
    </TextLink>
  </p>
)

export function SignUp({ audience }: { audience: Audience }) {
  const fin = audience === "financier"
  const fields = fin
    ? [
        { name: "organisation", label: "Institution or company name", autoComplete: "organization" },
        { name: "email", label: "Work email", kind: "email" as const, autoComplete: "email" },
        { name: "name", label: "Authorised representative's full name", autoComplete: "name" },
        { name: "phone", label: "Phone number", kind: "phone" as const },
        { name: "password", label: "Password", kind: "newPassword" as const, autoComplete: "new-password" },
        { name: "confirmPassword", label: "Confirm password", kind: "confirm" as const, autoComplete: "new-password" },
      ]
    : [
        { name: "email", label: "Business email", kind: "email" as const, autoComplete: "email" },
        { name: "phone", label: "Phone number", kind: "phone" as const },
        { name: "password", label: "Password", kind: "newPassword" as const, autoComplete: "new-password" },
        { name: "confirmPassword", label: "Confirm password", kind: "confirm" as const, autoComplete: "new-password" },
      ]
  return (
    <AuthShell
      audience={audience}
      title={fin ? "Access structured trade opportunities." : "Start moving your trade forward."}
      intro={
        fin
          ? "Create your institutional account to explore structured trade finance opportunities and begin your onboarding with Credence."
          : "Create your Credence account to structure transactions, access financing opportunities and manage your trade journey."
      }
    >
      <div className="space-y-6">
        <AuthForm
          fields={fields}
          endpoint="signUp"
          extra={{ audience }}
          variant={fin ? "accent" : "primary"}
          submitLabel={fin ? "Create Financier Account" : "Create Account"}
          sendingLabel="Creating account…"
          unavailable="Prototype: registration is not connected to an account service yet. Your details have not been submitted and no account has been created."
          messages={{
            conflict: (
              <>
                An account may already exist for this email address. <TextLink href={authHref("sign-in", audience)}>Sign in</TextLink> or <TextLink href={withType("forgot-password", audience)}>reset your password</TextLink>.
              </>
            ),
          }}
          onDone={(_, payload) => {
            setPendingEmail(payload.email ?? "")
            goto(withType("verify-email", audience))
          }}
        />
        {fin && <Meta>Creating an account does not authorise participation in transactions. Institutional access is subject to Credence review.</Meta>}
        <p className="text-sm leading-relaxed text-near-black/60">
          By creating an account you agree to the{" "}
          <a href="#/terms" target="_blank" rel="noopener" className="text-near-black underline decoration-near-black/35 underline-offset-4 hover:decoration-near-black">
            Terms and Conditions
          </a>{" "}
          and acknowledge the{" "}
          <a href="#/privacy" target="_blank" rel="noopener" className="text-near-black underline decoration-near-black/35 underline-offset-4 hover:decoration-near-black">
            Privacy Policy
          </a>
          .
        </p>
        <SwitchLine a={audience} kind="sign-up" />
      </div>
    </AuthShell>
  )
}

/* ---------- Sign in ---------- */

export function SignIn({ audience }: { audience: Audience }) {
  const [authed, setAuthed] = useState(false)
  const fin = audience === "financier"
  const dest = config.auth.postSignInUrl[audience]
  return (
    <AuthShell audience={audience} title="Welcome back." intro={fin ? "Access your Credence Financier workspace." : "Sign in to continue managing your trade opportunities."}>
      {authed ? (
        <StatusPanel eyebrow="Signed in" title="Authentication confirmed">
          {dest ? "Redirecting…" : "No destination is configured for this account type yet."}
        </StatusPanel>
      ) : (
        <div className="space-y-6">
          <AuthForm
            fields={[
              { name: "email", label: fin ? "Work email" : "Business email", kind: "email", autoComplete: "username" },
              {
                name: "password",
                label: "Password",
                kind: "password",
                autoComplete: "current-password",
                labelAction: (
                  <a href={withType("forgot-password", audience)} className="text-sm text-near-black/65 underline decoration-near-black/30 underline-offset-4 hover:text-near-black">
                    Forgot password?
                  </a>
                ),
              },
            ]}
            endpoint="signIn"
            extra={{ audience }}
            variant={fin ? "accent" : "primary"}
            submitLabel="Sign In"
            sendingLabel="Signing in…"
            unavailable="Prototype: the authentication service is not connected, so no sign-in was attempted."
            messages={{ rejected: "We could not sign you in with those details. Check your email and password and try again." }}
            onDone={() => {
              if (dest) window.location.href = dest
              else setAuthed(true)
            }}
          />
          <SwitchLine a={audience} kind="sign-in" />
        </div>
      )}
    </AuthShell>
  )
}

/* ---------- Recovery ---------- */

export function ForgotPassword() {
  const q = useHashQuery()
  const a = audienceOf(q.get("type"))
  const [done, setDone] = useState(false)
  const back = a ? authHref("sign-in", a) : "#/auth?mode=signin"
  return (
    <AuthShell audience={a} title="Reset your password" intro="Enter the email address for your account and we will send recovery instructions if it is registered.">
      {done ? (
        <StatusPanel eyebrow="Request received" title="Check your email" actions={<LinkButton href={back} variant="outline">Back to Sign In</LinkButton>}>
          If an account exists for that email address, recovery instructions will be sent to it. The link can only be used for a limited time.
        </StatusPanel>
      ) : (
        <div className="space-y-6">
          <AuthForm
            fields={[{ name: "email", label: a === "financier" ? "Work email" : "Email address", kind: "email", autoComplete: "email" }]}
            endpoint="forgotPassword"
            extra={a ? { audience: a } : {}}
            submitLabel="Send recovery instructions"
            sendingLabel="Sending…"
            unavailable="Password recovery is not available yet. No request was made and no email has been sent."
            onDone={() => setDone(true)}
          />
          <p className="text-sm text-near-black/60">
            <TextLink href={back}>Back to Sign In</TextLink>
          </p>
        </div>
      )}
    </AuthShell>
  )
}

export function ResetPassword() {
  const q = useHashQuery()
  const a = audienceOf(q.get("type"))
  const token = q.get("token") ?? ""
  const preview = import.meta.env.DEV ? q.get("state") : null
  const [updated, setUpdated] = useState(false)
  const signInHref = a ? authHref("sign-in", a) : "#/auth?mode=signin"
  const requestHref = withType("forgot-password", a)
  const invalid = preview === "expired" || (!token && preview !== "form")

  if (updated || preview === "updated")
    return (
      <AuthShell audience={a} title="Password updated">
        <StatusPanel eyebrow="Complete" title="Your password has been changed" actions={<LinkButton href={signInHref}>Sign In</LinkButton>}>
          You can now sign in with your new password.
        </StatusPanel>
      </AuthShell>
    )
  if (invalid)
    return (
      <AuthShell audience={a} title="Reset link not valid">
        <StatusPanel eyebrow="Link expired" title="This reset link is invalid or has expired" actions={<LinkButton href={requestHref}>Request a new link</LinkButton>}>
          Reset links can only be used once and for a limited time.
        </StatusPanel>
      </AuthShell>
    )
  return (
    <AuthShell audience={a} title="Choose a new password" intro="Use a password you do not use anywhere else.">
      <div className="space-y-6">
        <AuthForm
          fields={[
            { name: "password", label: "New password", kind: "newPassword", autoComplete: "new-password" },
            { name: "confirmPassword", label: "Confirm new password", kind: "confirm", autoComplete: "new-password" },
          ]}
          endpoint="resetPassword"
          extra={{ token, ...(a ? { audience: a } : {}) }}
          submitLabel="Update password"
          sendingLabel="Updating…"
          unavailable="Password reset is not available yet. Your password has not been changed."
          messages={{
            expired: (
              <>
                This reset link has expired. <TextLink href={requestHref}>Request a new link</TextLink>.
              </>
            ),
          }}
          onDone={() => setUpdated(true)}
        />
        <p className="text-sm text-near-black/60">
          <TextLink href={signInHref}>Back to Sign In</TextLink>
        </p>
      </div>
    </AuthShell>
  )
}

/* ---------- Email verification ---------- */

const COOLDOWN = 60

function Resend({ a, email, onEmail }: { a?: Audience; email: string; onEmail?: (e: string) => void }) {
  const { status, send } = useAuthRequest("resendVerification")
  const [left, setLeft] = useState(0)
  useEffect(() => {
    if (left <= 0) return
    const t = setTimeout(() => setLeft((n) => n - 1), 1000)
    return () => clearTimeout(t)
  }, [left])

  if (!email)
    return (
      <AuthForm
        fields={[{ name: "email", label: "Email address", kind: "email", autoComplete: "email" }]}
        endpoint="resendVerification"
        extra={a ? { audience: a } : {}}
        submitLabel="Resend verification email"
        sendingLabel="Sending…"
        unavailable="Prototype: the email service is not connected. No request was made and no email has been sent."
        onDone={(_, p) => {
          setPendingEmail(p.email ?? "")
          onEmail?.(p.email ?? "")
          setLeft(COOLDOWN)
        }}
      />
    )

  const resend = async () => {
    const r = await send({ email, ...(a ? { audience: a } : {}) })
    if (r === "ok") setLeft(COOLDOWN)
  }
  return (
    <div className="space-y-4">
      <Button type="button" variant={a === "financier" ? "accent" : "primary"} onClick={resend} disabled={status === "sending" || left > 0} className="w-full disabled:opacity-60">
        {status === "sending" ? "Sending…" : left > 0 ? `Resend available in ${left}s` : "Resend verification email"}
      </Button>
      <div aria-live="polite">
        {status === "ok" && <Notice live="status">A new verification email has been sent to {email}. Check your inbox and spam folder.</Notice>}
        {status === "unavailable" && <Notice live="status">Prototype: the email service is not connected. No email has been sent.</Notice>}
        {(status === "error" || status === "rejected" || status === "invalid") && <Notice>We could not send a new email. Check your connection and try again shortly.</Notice>}
      </div>
    </div>
  )
}

export function VerifyEmail() {
  const q = useHashQuery()
  const a = audienceOf(q.get("type")) ?? knownAudience()
  const token = q.get("token") ?? ""
  const preview = import.meta.env.DEV ? q.get("state") : null
  const { status, send } = useAuthRequest("verifyEmail")
  const [email, setEmail] = useState(getPendingEmail)
  const fired = useRef("")
  useEffect(() => {
    if (!token || fired.current === token) return
    fired.current = token
    void send({ token, ...(a ? { audience: a } : {}) })
  }, [token, a, send])
  useEffect(() => {
    if (status === "ok") goto(withType("verification-success", a))
  }, [status, a])
  const signInHref = a ? authHref("sign-in", a) : "#/auth?mode=signin"

  const state = preview ?? (!token ? "pending" : status === "ok" ? "verifying" : status === "idle" || status === "sending" ? "verifying" : status === "unavailable" ? "unavailable" : status === "expired" ? "expired" : "invalid")
  const lead = state === "expired" || state === "invalid"

  return (
    <AuthShell audience={a} title={lead ? "This link cannot be used." : "Verify your email address."} intro={state === "pending" ? "We've sent a verification link to your email. Open the message to continue setting up your account." : undefined}>
      {state === "verifying" && <StatusPanel eyebrow="Verifying" title="Checking your verification link…" />}
      {state === "unavailable" && <Notice>Prototype: email verification is not connected, so this link could not be checked. Nothing has been verified.</Notice>}
      {(state === "pending" || lead) && (
        <div className="space-y-6">
          {state === "pending" ? (
            <div className="border border-near-black/20 px-5 py-5">
              <p className="eyebrow text-near-black/60">Verification link sent to</p>
              <p className="mt-2 break-words font-display text-xl tracking-[-0.02em]">{email || "the email address you registered with"}</p>
              <p className="mt-3 text-sm leading-relaxed text-near-black/60">Can't find it? Check your spam folder, then request a new link below.</p>
            </div>
          ) : (
            <StatusPanel eyebrow={state === "expired" ? "Link expired" : "Link not valid"} title={state === "expired" ? "This verification link has expired" : "This verification link is invalid"}>
              Verification links can only be used once and for a limited time. Request a new link below.
            </StatusPanel>
          )}
          <Resend a={a} email={email} onEmail={setEmail} />
          {!config.auth.endpoints.resendVerification && <p className="text-sm text-near-black/55">Prototype: the email service is not connected yet, so no verification email has been sent.</p>}
          <p className="text-sm leading-relaxed text-near-black/60">
            {email && (
              <>
                <TextLink href={a ? authHref("sign-up", a) : "#/auth?mode=signup"}>Change email address</TextLink>
                <span className="mx-2 text-near-black/30" aria-hidden>
                  /
                </span>
              </>
            )}
            <TextLink href={signInHref}>Back to sign in</TextLink>
          </p>
        </div>
      )}
    </AuthShell>
  )
}

export function VerificationSuccess() {
  const q = useHashQuery()
  const a = audienceOf(q.get("type")) ?? knownAudience()
  useEffect(() => rememberAudience(a), [a])
  // Backend must gate this destination: it should only be reachable after the server confirms verification.
  const dest = a ? config.auth.onboardingHandoff[a] : ""
  const label = a === "financier" ? "Continue to Institutional Onboarding" : "Continue to Business Verification"
  return (
    <AuthShell audience={a} title="Email verified successfully." intro="Your account is ready for the next step.">
      {a ? (
        dest ? (
          <LinkButton href={dest} variant={a === "financier" ? "accent" : "primary"} className="w-full sm:w-auto">
            {label}
          </LinkButton>
        ) : (
          <div className="space-y-4">
            <span aria-disabled="true" className="inline-flex min-h-11 w-full cursor-not-allowed items-center justify-center rounded-ui border border-near-black/15 px-5 text-sm text-near-black/45 sm:w-auto">
              {label}
            </span>
            <Notice live="status">Placeholder: the onboarding destination has not been configured yet. Engineering sets it in config.auth.onboardingHandoff.</Notice>
          </div>
        )
      ) : (
        <LinkButton href="#/auth?mode=signin" className="w-full sm:w-auto">
          Sign in to continue
        </LinkButton>
      )}
    </AuthShell>
  )
}
