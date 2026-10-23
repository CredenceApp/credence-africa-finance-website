import { useEffect, type ComponentType } from "react"
import { platformHref, type Audience, type AuthKind } from "../links"
import { AuthChoice } from "./pages"

const legacySignUp = () => {
  useEffect(() => window.location.replace("#/auth?mode=signup"), [])
  return null
}
const platformRedirect = (kind: AuthKind, audience: Audience): ComponentType => function PlatformRedirect() {
  useEffect(() => window.location.replace(platformHref(kind, audience)), [])
  return null
}
const merchantSignUp = platformRedirect("sign-up", "merchant")
const financierSignUp = platformRedirect("sign-up", "financier")
const merchantSignIn = platformRedirect("sign-in", "merchant")
const financierSignIn = platformRedirect("sign-in", "financier")

export const authRoutes: Record<string, ComponentType> = {
  auth: AuthChoice,
  "auth/merchant/signup": merchantSignUp,
  "auth/merchant/login": merchantSignIn,
  "auth/financier/signup": financierSignUp,
  "auth/financier/login": financierSignIn,
  // Earlier paths kept as aliases so existing links keep working.
  "sign-up": legacySignUp,
  "sign-in": AuthChoice,
  "sign-up/merchant": merchantSignUp,
  "sign-up/financier": financierSignUp,
  "sign-in/merchant": merchantSignIn,
  "sign-in/financier": financierSignIn,
}
