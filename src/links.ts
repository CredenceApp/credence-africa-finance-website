import { config } from "./config"

export type Intent = "merchant" | "capital"

export const contactHref = (intent?: Intent) => `#/contact${intent ? `?intent=${intent}` : ""}`
export const goto = (hash: string) => {
  window.location.hash = hash
}
export const bookBriefing = () => goto(contactHref("capital"))
export type Audience = "merchant" | "financier"
export type AuthKind = "sign-up" | "sign-in"

export const platformHref = (kind: AuthKind, audience: Audience) =>
  config.platforms[audience][kind === "sign-up" ? "signUp" : "signIn"]

// Account type is remembered for the session only, as a navigation hint. It is never proof of authorisation.
const KEY = "credence.audience"
export const rememberAudience = (a?: Audience) => {
  if (!a) return
  try {
    sessionStorage.setItem(KEY, a)
  } catch {
    /* storage unavailable */
  }
}
export const knownAudience = (): Audience | undefined => {
  try {
    const v = sessionStorage.getItem(KEY)
    return v === "merchant" || v === "financier" ? v : undefined
  } catch {
    return undefined
  }
}

export const authHref = (kind: AuthKind, audience?: Audience) =>
  audience ? platformHref(kind, audience) : `#/auth?mode=${kind === "sign-up" ? "signup" : "signin"}`
export const getStarted = (audience?: Audience) => {
  if (config.onboardingUrl) window.location.href = config.onboardingUrl
  else {
    const a = audience ?? knownAudience()
    rememberAudience(a)
    if (a) window.location.href = platformHref("sign-up", a)
    else goto(authHref("sign-up"))
  }
}
export const signIn = (audience?: Audience) => {
  const a = audience ?? knownAudience()
  if (a) window.location.href = platformHref("sign-in", a)
  else goto(authHref("sign-in"))
}
export const reportAvailable = Boolean(config.report.accessEndpoint)
