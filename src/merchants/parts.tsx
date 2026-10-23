import { useEffect, useState } from "react"

export { Head } from "../financiers/parts"

export function useMobile(bp = 768) {
  const [m, setM] = useState(() => typeof window !== "undefined" && window.innerWidth < bp)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${bp - 1}px)`)
    const f = () => setM(mq.matches)
    f()
    mq.addEventListener("change", f)
    return () => mq.removeEventListener("change", f)
  }, [bp])
  return m
}
