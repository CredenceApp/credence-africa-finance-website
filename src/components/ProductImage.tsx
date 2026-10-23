import type { ReactNode } from "react"
import { EASE, useInView } from "../hooks"

type Tone = "light" | "dark"
export type Kind = "workspace" | "review" | "monitor" | "submit" | "progress" | "intel" | "document" | "assessment"

const T = {
  light: {
    frame: "border-near-black/20 bg-warm-white text-near-black",
    line: "border-near-black/12",
    bar: "bg-near-black/10",
    barStrong: "bg-near-black/20",
    panel: "bg-stone/60",
    fill: "bg-green",
    soft: "bg-green/30",
    ring: "border-near-black/35",
    alert: "bg-orange/80",
    chip: "border-near-black/25 bg-stone/95",
    muted: "text-near-black/50",
    shadow: "shadow-[0_28px_60px_-44px_rgba(14,36,32,0.38)]",
  },
  dark: {
    frame: "border-white/15 bg-charcoal text-white",
    line: "border-white/10",
    bar: "bg-white/10",
    barStrong: "bg-white/20",
    panel: "bg-white/[0.035]",
    fill: "bg-green",
    soft: "bg-green/45",
    ring: "border-white/35",
    alert: "bg-orange/80",
    chip: "border-white/25 bg-midnight/95",
    muted: "text-white/50",
    shadow: "shadow-[0_28px_60px_-44px_rgba(0,0,0,0.7)]",
  },
}
type Th = (typeof T)[Tone]

const Bar = ({ t, w, strong, h = "h-1.5", className = "" }: { t: Th; w: number; strong?: boolean; h?: string; className?: string }) => (
  <div className={`${h} ${strong ? t.barStrong : t.bar} ${className}`} style={{ width: `${w}%` }} />
)
const Box = ({ t, className = "", children }: { t: Th; className?: string; children?: ReactNode }) => (
  <div className={`border ${t.line} ${className}`}>{children}</div>
)
const Stack = ({ t, ws, gap = "space-y-2" }: { t: Th; ws: number[]; gap?: string }) => (
  <div className={gap}>
    {ws.map((w, i) => (
      <Bar key={i} t={t} w={w} />
    ))}
  </div>
)
type S = "done" | "active" | "idle" | "alert"
const Dot = ({ t, s, round }: { t: Th; s: S; round?: boolean }) => (
  <span
    className={`size-2.5 shrink-0 ${round ? "rounded-full" : ""} ${
      s === "done" ? t.fill : s === "alert" ? t.alert : s === "active" ? `border bg-transparent ${t.ring}` : `border ${t.line}`
    }`}
  />
)
const TopBar = ({ t, tabs = 3 }: { t: Th; tabs?: number }) => (
  <div className={`flex h-10 shrink-0 items-center gap-3 border-b px-5 ${t.line}`}>
    <span className={`size-3 ${t.barStrong}`} />
    <span className={`h-1.5 w-12 ${t.barStrong}`} />
    {Array.from({ length: tabs }).map((_, i) => (
      <span key={i} className={`h-1.5 ${i === 0 ? "w-10 " + t.soft : "w-9 " + t.bar} ${i === 0 ? "" : ""}`} />
    ))}
    <span className={`ml-auto size-4 rounded-full border ${t.line}`} />
  </div>
)
const Rail = ({ t, w = "w-[11%]", active = 1 }: { t: Th; w?: string; active?: number }) => (
  <div className={`hidden shrink-0 space-y-3 border-r p-4 sm:block ${w} ${t.line}`}>
    {[70, 55, 80, 60, 75, 50, 65].map((x, i) => (
      <div key={i} className="flex items-center gap-2">
        <span className={`size-2 shrink-0 ${i === active ? t.fill : t.bar}`} />
        <Bar t={t} w={x} strong={i === active} />
      </div>
    ))}
  </div>
)
const Timeline = ({ t, n, done, active }: { t: Th; n: number; done: number; active?: number }) => (
  <div className="relative flex justify-between">
    <span className={`absolute left-1 right-1 top-[5px] h-px ${t.barStrong}`} />
    <span className={`absolute left-1 top-[5px] h-px ${t.fill}`} style={{ width: `${(done / (n - 1)) * 96}%` }} />
    {Array.from({ length: n }).map((_, i) => (
      <div key={i} className="relative flex flex-col items-center gap-2">
        <span
          className={`size-[11px] rounded-full ${i < done ? `${t.fill}` : i === (active ?? done) ? `border bg-charcoal/0 ${t.ring} ${t.panel}` : `border ${t.line} ${t.panel}`} ${
            i <= done ? t.fill : ""
          }`}
        />
        <Bar t={t} w={100} className="w-9" />
      </div>
    ))}
  </div>
)
const Rows = ({ t, rows, status }: { t: Th; rows: number; status: S[] }) => (
  <div>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className={`flex items-center gap-3 border-t py-3 ${t.line}`}>
        <Dot t={t} s={status[i % status.length]} />
        <Bar t={t} w={[34, 26, 40, 30, 36][i % 5]} strong />
        <Bar t={t} w={[22, 30, 18, 26, 20][i % 5]} className="ml-auto !w-[22%]" />
        <span className={`h-4 w-12 border ${t.line}`} />
      </div>
    ))}
  </div>
)
const Segments = ({ t, on }: { t: Th; on: number }) => (
  <div className="flex gap-1">
    {[0, 1, 2, 3].map((i) => (
      <span key={i} className={`h-2 flex-1 ${i < on ? t.fill : t.bar}`} />
    ))}
  </div>
)
const Heading = ({ t }: { t: Th }) => (
  <div className="flex items-end justify-between gap-6">
    <div className="w-1/2 space-y-2">
      <Bar t={t} w={60} strong h="h-2.5" />
      <Bar t={t} w={36} />
    </div>
    <div className="flex gap-2">
      <span className={`h-6 w-16 border ${t.line}`} />
      <span className={`h-6 w-12 ${t.soft}`} />
    </div>
  </div>
)
const Field = ({ t, w = 40 }: { t: Th; w?: number }) => (
  <div className="space-y-2">
    <Bar t={t} w={w} />
    <Box t={t} className="h-8" />
  </div>
)

function Workspace({ t }: { t: Th }) {
  return (
    <>
      <TopBar t={t} />
      <div className="flex min-h-0 flex-1">
        <Rail t={t} />
        <div className="min-w-0 flex-1 space-y-5 p-6">
          <Heading t={t} />
          <div className="grid grid-cols-[1fr_1.2fr] gap-4">
            <Box t={t} className="space-y-3 p-4">
              <Bar t={t} w={35} strong />
              <div className="flex items-center gap-3"><span className={`size-5 ${t.bar}`} /><Stack t={t} ws={[70, 40]} /></div>
              <div className="flex items-center gap-3"><span className={`size-5 ${t.bar}`} /><Stack t={t} ws={[60, 45]} /></div>
            </Box>
            <Box t={t} className="space-y-3 p-4">
              <Bar t={t} w={40} strong />
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {[0, 1, 2, 3].map((i) => <Stack key={i} t={t} ws={[45, 75]} gap="space-y-1.5" />)}
              </div>
            </Box>
          </div>
          <div className={`border-y py-4 ${t.line}`}>
            <Timeline t={t} n={5} done={2} />
          </div>
          <div>
            <Bar t={t} w={20} strong />
            <div className="mt-2"><Rows t={t} rows={4} status={["done", "done", "active", "idle"]} /></div>
          </div>
        </div>
        <div className={`hidden w-[26%] shrink-0 space-y-4 border-l p-5 md:block ${t.line}`}>
          <Bar t={t} w={50} strong />
          <Segments t={t} on={2} />
          <Box t={t} className={`h-16 ${t.panel}`} />
          <Rows t={t} rows={4} status={["done", "idle", "idle"]} />
        </div>
      </div>
    </>
  )
}

function Review({ t }: { t: Th }) {
  return (
    <>
      <TopBar t={t} tabs={4} />
      <div className="flex min-h-0 flex-1">
        <Rail t={t} w="w-[9%]" active={2} />
        <div className="min-w-0 flex-1 space-y-5 p-6">
          <Heading t={t} />
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <Box key={i} t={t} className={`space-y-2 p-3 ${i === 0 ? t.panel : ""}`}>
                <Bar t={t} w={45} />
                <Bar t={t} w={70} strong h="h-2" />
              </Box>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Box t={t} className="space-y-3 p-4">
              <Bar t={t} w={50} strong />
              {[0, 1].map((i) => (
                <div key={i} className={`flex items-center gap-3 border-t pt-3 ${t.line}`}><span className={`size-6 ${t.bar}`} /><Stack t={t} ws={[75, 45]} /></div>
              ))}
            </Box>
            <Box t={t} className="space-y-3 p-4">
              <Bar t={t} w={55} strong />
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className={`flex justify-between gap-4 border-t pt-2.5 ${t.line}`}><Bar t={t} w={30} /><Bar t={t} w={[34, 26, 40, 30, 36][i]} strong /></div>
              ))}
            </Box>
            <Box t={t} className="space-y-3 p-4">
              <Bar t={t} w={40} strong />
              <Box t={t} className={`h-12 ${t.panel}`} />
              <Stack t={t} ws={[80, 60, 70]} gap="space-y-2.5" />
            </Box>
          </div>
          <div>
            <Bar t={t} w={18} strong />
            <div className="mt-2"><Rows t={t} rows={5} status={["done", "done", "active", "done", "idle"]} /></div>
          </div>
        </div>
        <div className={`hidden w-[27%] shrink-0 space-y-4 border-l p-5 md:block ${t.line}`}>
          <Bar t={t} w={55} strong />
          <Box t={t} className={`space-y-3 p-4 ${t.panel}`}>
            <Segments t={t} on={3} />
            <Stack t={t} ws={[80, 55]} />
          </Box>
          <Rows t={t} rows={5} status={["done", "active", "idle", "idle", "idle"]} />
          <Box t={t} className="h-20" />
        </div>
      </div>
    </>
  )
}

function Monitor({ t }: { t: Th }) {
  return (
    <>
      <TopBar t={t} tabs={2} />
      <div className="min-w-0 flex-1 space-y-5 p-6">
        <div className="flex items-center justify-between gap-6">
          <Stack t={t} ws={[160, 90].map((x) => x * 0.4)} />
          <div className="flex gap-2">{[0, 1, 2].map((i) => <span key={i} className={`h-6 w-14 ${i === 0 ? t.soft : `border ${t.line}`}`} />)}</div>
        </div>
        <Box t={t} className={`px-6 py-5 ${t.panel}`}>
          <Timeline t={t} n={6} done={3} />
        </Box>
        <div className="grid grid-cols-[1.5fr_1fr] gap-4">
          <div>
            <Bar t={t} w={24} strong />
            <div className="mt-2"><Rows t={t} rows={5} status={["done", "done", "active", "alert", "idle"]} /></div>
          </div>
          <div className="space-y-4">
            <Box t={t} className="space-y-3 p-4">
              <Bar t={t} w={45} strong />
              <Segments t={t} on={1} />
              <Stack t={t} ws={[70, 50]} />
            </Box>
            <Box t={t} className="space-y-2.5 p-4">
              <Bar t={t} w={35} strong />
              <div className="flex items-center gap-2"><Dot t={t} s="alert" round /><Bar t={t} w={60} /></div>
              <div className="flex items-center gap-2"><Dot t={t} s="idle" round /><Bar t={t} w={45} /></div>
            </Box>
          </div>
        </div>
      </div>
    </>
  )
}

function Submit({ t }: { t: Th }) {
  return (
    <>
      <div className={`flex h-10 shrink-0 items-center gap-3 border-b px-5 ${t.line}`}>
        <Bar t={t} w={100} strong className="!w-24" />
        <span className={`ml-auto h-1.5 w-10 ${t.bar}`} />
      </div>
      <div className="min-w-0 flex-1 space-y-5 p-6">
        <Stack t={t} ws={[34, 22]} />
        <div className="grid grid-cols-2 gap-x-5 gap-y-4">
          <Field t={t} w={35} />
          <Field t={t} w={30} />
          <div className="col-span-2"><Field t={t} w={22} /></div>
          <Field t={t} w={40} />
          <Field t={t} w={45} />
          <Field t={t} w={25} />
          <Field t={t} w={32} />
        </div>
        <Box t={t} className={`flex h-16 items-center gap-3 border-dashed px-4 ${t.panel}`}>
          {[0, 1, 2].map((i) => <span key={i} className={`h-8 w-6 border ${t.line}`} />)}
          <Bar t={t} w={30} className="ml-2" />
        </Box>
      </div>
    </>
  )
}

function Progress({ t }: { t: Th }) {
  return (
    <>
      <TopBar t={t} tabs={2} />
      <div className="min-w-0 flex-1 space-y-5 p-6">
        <Stack t={t} ws={[30, 20]} />
        <Box t={t} className={`px-6 py-5 ${t.panel}`}>
          <Timeline t={t} n={7} done={2} />
        </Box>
        <div className="grid grid-cols-[1.4fr_1fr] gap-4">
          <Box t={t} className="space-y-3 p-4">
            <Bar t={t} w={40} strong />
            <Rows t={t} rows={3} status={["done", "active", "idle"]} />
          </Box>
          <Box t={t} className="space-y-3 p-4">
            <Bar t={t} w={50} strong />
            <Segments t={t} on={2} />
            <Stack t={t} ws={[75, 55, 65]} gap="space-y-2.5" />
          </Box>
        </div>
      </div>
    </>
  )
}

function Intel({ t }: { t: Th }) {
  const tones = ["bg-white/10", "bg-green/40", "bg-green/70", "bg-white/20"]
  return (
    <>
      <TopBar t={t} tabs={5} />
      <div className="flex min-h-0 flex-1">
        <Rail t={t} w="w-[9%]" active={3} />
        <div className="min-w-0 flex-1 space-y-5 p-6">
          <Heading t={t} />
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <Box key={i} t={t} className={`space-y-3 p-4 ${t.panel}`}>
                <div className="flex items-center justify-between"><Bar t={t} w={50} strong /><Dot t={t} s={i === 2 ? "active" : "done"} round /></div>
                <Stack t={t} ws={[80, 55, 70, 45]} gap="space-y-2.5" />
              </Box>
            ))}
          </div>
          <div className="grid grid-cols-[1.6fr_1fr] gap-4">
            <Box t={t} className="space-y-3 p-4">
              <Bar t={t} w={30} strong />
              <div className="grid grid-cols-12 gap-1.5">
                {Array.from({ length: 36 }).map((_, i) => (
                  <span key={i} className={`aspect-[2/1] ${tones[(i * 7 + (i % 5)) % 4]}`} />
                ))}
              </div>
            </Box>
            <Box t={t} className="p-4">
              <Rows t={t} rows={4} status={["done", "active", "idle", "done"]} />
            </Box>
          </div>
        </div>
      </div>
    </>
  )
}

function Document({ t }: { t: Th }) {
  return (
    <div className="space-y-3 p-4" aria-hidden>
      <Bar t={t} w={35} strong h="h-2" />
      {(["done", "done", "active", "idle"] as S[]).map((s, i) => (
        <div key={i} className={`flex items-center gap-3 border-t pt-3 ${t.line}`}>
          <span className={`h-5 w-4 shrink-0 border ${t.line}`} />
          <Bar t={t} w={[62, 48, 56, 40][i]} />
          <span className="ml-auto"><Dot t={t} s={s} /></span>
        </div>
      ))}
    </div>
  )
}

function Assessment({ t }: { t: Th }) {
  return (
    <div className="space-y-3 p-4" aria-hidden>
      <Bar t={t} w={40} strong h="h-2" />
      <Segments t={t} on={3} />
      {(["done", "active", "idle"] as S[]).map((s, i) => (
        <div key={i} className={`flex items-center gap-3 border-t pt-3 ${t.line}`}>
          <Dot t={t} s={s} round />
          <Bar t={t} w={[58, 46, 52][i]} />
        </div>
      ))}
    </div>
  )
}

const BODY: Partial<Record<Kind, (p: { t: Th }) => ReactNode>> = {
  workspace: Workspace,
  review: Review,
  monitor: Monitor,
  submit: Submit,
  progress: Progress,
  intel: Intel,
}

// Inner canvas is wider/taller than the frame so edges read as cropped; mobile crops harder.
const CROP: Record<string, string> = {
  workspace: "w-[170%] sm:w-[114%] left-0 sm:-left-[3%] h-[108%]",
  review: "w-[185%] sm:w-[116%] left-0 sm:-left-[6%] h-[118%]",
  monitor: "w-[150%] sm:w-[108%] left-0 h-[115%]",
  submit: "w-[135%] sm:w-[100%] left-0 h-[112%]",
  progress: "w-[150%] sm:w-[108%] left-0 h-[115%]",
  intel: "w-[185%] sm:w-[118%] left-0 sm:-left-[7%] h-[115%]",
}

function Label({ group, title, t, className = "" }: { group?: string; title: string; t: Th; className?: string }) {
  return (
    <div className={`border px-3 py-2 text-[11px] leading-snug tracking-[0.04em] ${t.chip} ${className}`}>
      {group && <p>{group}</p>}
      <p>{title}</p>
    </div>
  )
}

export default function ProductImage({
  group,
  title,
  kind = "workspace",
  tone = "light",
  className = "",
  delay = 0,
  labelClass = "bottom-4 right-4 md:bottom-5 md:right-5",
}: {
  group?: string
  title: string
  kind?: Kind
  tone?: Tone
  className?: string
  delay?: number
  labelClass?: string
}) {
  const [ref, seen] = useInView<HTMLDivElement>(0.15)
  const t = T[tone]
  const fragment = kind === "document" || kind === "assessment"
  const Body = BODY[kind]
  const name = [group, title].filter(Boolean).join(" ")
  return (
    <div
      ref={ref}
      role="img"
      aria-label={name}
      data-product-placeholder
      className={`relative overflow-hidden border transition-all duration-1000 motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:transition-none ${t.frame} ${t.shadow} ${
        seen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      } ${fragment ? "" : "aspect-[4/5] sm:aspect-[16/10]"} ${className}`}
      style={{ transitionDelay: `${delay}ms`, transitionTimingFunction: EASE }}
    >
      {fragment ? (
        <>
          <div className={`h-0.5 w-full ${t.soft}`} />
          {kind === "document" ? <Document t={t} /> : <Assessment t={t} />}
          <Label title={title} t={t} className="m-4 mt-0 border-0 !p-0 bg-transparent" />
        </>
      ) : (
        <>
          <div className={`absolute top-0 flex flex-col ${CROP[kind]}`} aria-hidden>
            {Body && <Body t={t} />}
          </div>
          <Label group={group} title={title} t={t} className={`absolute ${labelClass}`} />
        </>
      )}
    </div>
  )
}
