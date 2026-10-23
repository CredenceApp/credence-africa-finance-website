import { useEffect, useRef, useState } from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

export default function HeroVideo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [reduce, setReduce] = useState(() => typeof window !== "undefined" && window.matchMedia(QUERY).matches)

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const f = () => setReduce(mq.matches)
    mq.addEventListener("change", f)
    return () => mq.removeEventListener("change", f)
  }, [])

  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (reduce) {
      v.pause()
      v.currentTime = 0
    } else {
      void v.play().catch(() => {})
    }
  }, [reduce])

  return (
    <video
      ref={ref}
      className={className}
      src="/media/credence-hero.mp4"
      poster="/media/credence-hero-poster.jpg"
      autoPlay={!reduce}
      muted
      loop
      playsInline
      preload="metadata"
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      tabIndex={-1}
      aria-hidden="true"
    />
  )
}
