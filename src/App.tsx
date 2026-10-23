import { useEffect, useState, type ComponentType } from "react"
import Home from "./pages/Home"
import DesignSystem from "./pages/DesignSystem"
import Financiers from "./pages/Financiers"
import Merchants from "./pages/Merchants"
import Intelligence from "./pages/Intelligence"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Careers from "./pages/Careers"
import Report from "./pages/Report"
import { legalPages } from "./pages/Legal"
import { authRoutes } from "./auth/routes"
import CookieConsent from "./components/CookieConsent"

const routes: Record<string, ComponentType> = {
  ...(import.meta.env.DEV ? { "design-system": DesignSystem } : {}),
  ...authRoutes,
  financiers: Financiers,
  merchants: Merchants,
  intelligence: Intelligence,
  about: About,
  contact: Contact,
  careers: Careers,
  report: Report,
  ...legalPages,
}

const getRoute = (): string => {
  const h = window.location.hash
  if (h.startsWith("#/")) {
    const key = h.slice(2).split(/[?#]/)[0].replace(/\/$/, "")
    return key in routes ? key : "home"
  }
  if (h === "") {
    const key = window.location.pathname.replace(/^\/|\/$/g, "")
    if (key in routes) return key
  }
  return "home"
}

export default function App() {
  const [route, setRoute] = useState<string>(getRoute)

  const scrollToSection = () => {
    const section = new URLSearchParams(window.location.hash.split("?")[1] ?? "").get("section")
    if (!section) return false
    let tries = 0
    const go = () => {
      const el = document.getElementById(section)
      if (el) el.scrollIntoView()
      else if (tries++ < 10) setTimeout(go, 60)
    }
    go()
    return true
  }

  useEffect(() => {
    const onHash = () => {
      setRoute(getRoute())
      scrollToSection()
    }
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])

  useEffect(() => {
    const id = window.location.hash.slice(1)
    const target = id && !id.startsWith("/") ? document.getElementById(id) : null
    if (target) target.scrollIntoView()
    else if (!scrollToSection()) window.scrollTo(0, 0)
  }, [route])

  const Page = routes[route] ?? Home
  return (
    <>
      <Page />
      <CookieConsent />
    </>
  )
}
