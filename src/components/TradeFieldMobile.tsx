import { EASE } from "../hooks"

const stages = ["Opportunity", "Verify", "Structure", "Capital", "Execute", "Settle"]
const G = "#4f8a7e"
const ORANGE = "#f08921"
const X0 = 34
const STEP = 58.4
const Y = 110

const fade = (d: number) => ({ opacity: 0, animation: `fade .7s ${EASE} ${d}s forwards` })

export default function TradeFieldMobile() {
  return (
    <svg
      viewBox="0 0 360 220"
      className="absolute inset-0 size-full"
      fill="none"
      role="img"
      aria-label="Transaction path: opportunity, verify, structure, capital, execute, settle."
    >
      <path d={`M${X0} ${Y} H${X0 + STEP * 5}`} stroke="rgba(255,255,255,0.25)" strokeDasharray="2 6" />
      <path
        d={`M${X0} ${Y} H${X0 + STEP * 5}`}
        stroke={G}
        strokeWidth="2"
        pathLength={1}
        style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: `draw 2.6s ${EASE} .6s forwards` }}
      />
      {stages.map((s, i) => {
        const x = X0 + i * STEP
        const up = i % 2 === 0
        const cap = i === 3
        const last = i === 5
        const d = 0.7 + i * 0.45
        return (
          <g key={s} style={fade(d)}>
            <path d={`M${x} ${Y} V${up ? Y - 26 : Y + 26}`} stroke={cap ? ORANGE : "rgba(255,255,255,0.35)"} />
            {last ? (
              <>
                <circle cx={x} cy={Y} r="8" fill="#173b35" stroke={G} strokeWidth="1.5" />
                <path d={`M${x - 3.5} ${Y} l2.5 2.5 l5 -6`} stroke="#fff" strokeWidth="1.5" />
              </>
            ) : (
              <circle cx={x} cy={Y} r={cap ? 5 : 4} fill={cap ? ORANGE : i === 0 ? "#fff" : "#0b0e0d"} stroke={cap ? ORANGE : "#fff"} />
            )}
            <text
              x={x}
              y={up ? Y - 34 : Y + 40}
              textAnchor={i === 0 ? "start" : last ? "end" : "middle"}
              dx={i === 0 ? -8 : last ? 4 : 0}
              fontSize="9.5"
              letterSpacing="0.8"
              fill={cap ? ORANGE : "rgba(255,255,255,0.9)"}
              className="font-sans uppercase"
            >
              {s}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
