// Production destinations and approved details. Leave empty until supplied.
const publicApiBaseUrl = (import.meta.env.VITE_PUBLIC_API_URL || "https://credence-backend-0fqz.onrender.com").replace(/\/+$/, "")
const developmentTurnstileSiteKey = "1x00000000000000000000AA"
// Turnstile site keys are public and hostname-restricted. Keeping the
// production key as a fallback makes static builds work even when the host
// does not support build-time environment variables.
const productionTurnstileSiteKey = "0x4AAAAAAFinhYg3XDn1_kZI"

export const config = {
  // Live account-platform routes verified against the deployed applications.
  platforms: {
    merchant: {
      signIn: "https://merchant.credence54.com/",
      signUp: "https://merchant.credence54.com/signup",
    },
    financier: {
      signIn: "https://financier.credence54.com/",
      signUp: "https://financier.credence54.com/signup",
    },
  },
  // Optional external onboarding destination. When empty, Get Started opens the in-site registration flow.
  onboardingUrl: "",
  // Authentication service (POST, JSON). Leave an endpoint empty until the backend is connected: the related form then
  // reports that the service is not available and sends nothing. No endpoint is ever simulated.
  auth: {
    passwordMinLength: 8,
    // Where to send a user after the sign-in service confirms authentication. No destination is invented.
    postSignInUrl: { merchant: "", financier: "" },
    // Where verified users continue: Merchant business verification (KYB) and Financier institutional onboarding.
    // Supply approved platform URLs. While empty, the verification-success screen shows a labelled placeholder.
    onboardingHandoff: { merchant: "", financier: "" },
    endpoints: {
      signUp: "",
      signIn: "",
      forgotPassword: "",
      resetPassword: "",
      verifyEmail: "",
      resendVerification: "",
    },
  },
  // The report PDF stays private on the backend. The public website requests a
  // short-lived download grant only after the lead form and bot check pass.
  report: {
    pageUrl: "/report",
    accessEndpoint: `${publicApiBaseUrl}/api/v1/reports/market-intelligence/access`,
  },
  turnstileSiteKey: import.meta.env.VITE_TURNSTILE_SITE_KEY || (import.meta.env.DEV ? developmentTurnstileSiteKey : productionTurnstileSiteKey),
  // Public contact API. Override the production origin with VITE_PUBLIC_API_URL for local or staging environments.
  formEndpoint: `${publicApiBaseUrl}/api/v1/contact/enquiries`,
  contact: {
    email: "support@credenceapp.co",
    phone: "+234 707 100 0043",
    office: "14 Babatunde Street, Off Ogunlana Drive, Lagos State",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/credenceapphq/",
    x: "https://x.com/credence54inc?s=21",
    instagram: "https://www.instagram.com/credence54inc",
  },
  // Working compliance details supplied by the client. Revise here if the client updates them.
  compliance: {
    entity: "Credence Charter Limited",
    address: ["14 Babatunde Street", "Off Ogunlana Drive", "Lagos State", "Nigeria"],
    email: "compliance@credenceapp.co",
    website: "www.credence54.com",
    ndpcId: "NDPC/DCP/15141",
    ndpcStatement: "Credence Charter Limited is registered as a Data Controller / Processor of Major Importance with the Nigeria Data Protection Commission.",
    // Set to the certificate file/URL once supplied; a "View certificate" link then appears.
    ndpcCertificateUrl: "",
  },
}
