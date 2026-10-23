import { useEffect, useRef, useState } from "react"

export const EASE = "cubic-bezier(0.65, 0, 0.35, 1)"

export const clamp = (v: number, min = 0, max = 1) => (Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : min)

export function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, seen] as const
}

// Progress (0..1) through a tall container whose child is sticky.
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const calc = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const total = r.height - window.innerHeight
      setP(Math.round(clamp(total > 0 ? -r.top / total : 0) * 400) / 400)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calc)
    }
    calc()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
  return [ref, p] as const
}

// Progress (0..1) of an element travelling through the viewport.
export function useViewProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const calc = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      setP(Math.round(clamp((vh * 0.9 - r.top) / (r.height + vh * 0.2)) * 200) / 200)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calc)
    }
    calc()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
  return [ref, p] as const
}

// Sticky scrub on md+ (progress through a tall container); on small screens the
// section is plain flow and progress follows the section through the viewport.
export function useScrub<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const calc = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      let v: number
      if (window.innerWidth >= 768 && vh >= 720) {
        const total = r.height - vh
        v = total > 0 ? -r.top / total : 0
      } else {
        v = (vh * 0.8 - r.top) / (Math.min(r.height, vh) * 0.9)
      }
      setP(Math.round(clamp(v) * 400) / 400)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calc)
    }
    calc()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
  return [ref, p] as const
}
