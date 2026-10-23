import type { CSSProperties } from "react"
import { EASE } from "../hooks"

const frags = [
  { t: "Agriculture", dx: -40, dy: -50, r: -6 },
  { t: "Energy", dx: 60, dy: 40, r: 5 },
  { t: "Solid minerals", dx: -30, dy: 70, r: 4 },
  { t: "Cross border", dx: 70, dy: -40, r: -5 },
  { t: "Commodity trade", dx: -50, dy: 30, r: 6 },
]
const stages = ["Origination", "Verification", "Structured file", "Capital review", "Participation", "Execution", "Settlement"]
const G = "#4f8a7e"
const AX = 640
const nx = (i: number) => 800 + i * 105

const draw = (dur: number, delay: number) => ({
  strokeDasharray: 1,
  strokeDashoffset: 1,
  animation: `draw ${dur}s ${EASE} ${delay}s forwards`,
})
const fade = (delay: number, dur = 0.8) => ({ opacity: 0, animation: `fade ${dur}s ${EASE} ${delay}s forwards` })
const small = "font-sans uppercase"

export default function FinField() {
  const files = [200, 272, 344]
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMaxYMid slice"
      className="absolute inset-0 size-full"
      fill="none"
      role="img"
      aria-label="Illustrative flow: trade opportunities from agriculture, energy, minerals and cross border trade enter Credence for origination and verification, resolve into structured transaction files, move to capital review and participation, then execution and settlement."
    >
      <g stroke="rgba(255,255,255,0.06)">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <path key={i} d={`M${nx(i)} 400 V${AX}`} />
        ))}
      </g>

      <text x="790" y="148" fill="rgba(255,255,255,0.45)" fontSize="10" letterSpacing="1.4" className={small} style={fade(0.4)}>
        Trade opportunities
      </text>
      {frags.map((f, i) => {
        const y = 182 + i * 42
        return (
          <g key={f.t}>
            <g transform={`translate(790 ${y})`}>
              <g style={{ "--dx": `${f.dx}px`, "--dy": `${f.dy}px`, "--r": `${f.r}deg`, animation: `fragment 1.5s ${EASE} ${0.4 + i * 0.1}s both` } as CSSProperties}>
                <rect y="-3" width="6" height="6" stroke="rgba(255,255,255,0.7)" />
                <text x="14" y="4" fill="rgba(255,255,255,0.65)" fontSize="10" letterSpacing="1.2" className={small}>
                  {f.t}
                </text>
              </g>
            </g>
            <path d={`M894 ${y} H905`} stroke="rgba(255,255,255,0.4)" pathLength={1} style={draw(0.6, 1.9 + i * 0.08)} />
          </g>
        )
      })}

      <path d="M905 160 V380" stroke={G} strokeWidth="1.5" pathLength={1} style={draw(0.9, 2.2)} />
      <text x="905" y="134" textAnchor="middle" fill="#fff" fontSize="10" letterSpacing="1.6" className={small} style={fade(2.6)}>
        Credence
      </text>

      {files.map((y, i) => (
        <g key={y} style={fade(3 + i * 0.25, 1)}>
          <path d={`M905 ${y} H960`} stroke={G} />
          <rect x="960" y={y - 26} width="100" height="52" stroke={G} fill="rgba(46,95,87,0.14)" />
          <path d={`M970 ${y - 14} H1020 M970 ${y - 4} H1050 M970 ${y + 6} H1038 M970 ${y + 16} H1046`} stroke="rgba(255,255,255,0.35)" />
        </g>
      ))}
      <text x="1010" y="150" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="10" letterSpacing="1.4" className={small} style={fade(3.4)}>
        Structured files
      </text>

      {files.map((y, i) => (
        <path key={y} d={`M1060 ${y} H1115`} stroke={G} pathLength={1} style={draw(0.7, 3.8 + i * 0.1)} />
      ))}
      <path d="M1115 180 V370" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" pathLength={1} style={draw(0.8, 4.1)} />
      <text x="1115" y="150" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="10" letterSpacing="1.4" className={small} style={fade(4.3)}>
        Review
      </text>

      <path d="M1115 272 H1220" stroke="#f08921" strokeWidth="2" pathLength={1} style={draw(0.7, 4.8)} />
      <path d={`M1220 272 V${AX}`} stroke="#f08921" strokeWidth="2" pathLength={1} style={draw(1.4, 5.3)} />
      <circle cx="1220" cy="272" r="4.5" fill="#f08921" style={fade(5.2)} />

      <path d={`M0 ${AX} H1440`} stroke="rgba(255,255,255,0.1)" />
      <path d={`M${nx(0)} ${AX} H1115`} stroke={G} strokeWidth="2" pathLength={1} style={draw(2.8, 1.6)} />
      <path d={`M1115 ${AX} H1220`} stroke="#f08921" strokeWidth="2" pathLength={1} style={draw(0.6, 4.6)} />
      <path d={`M1220 ${AX} H${nx(6)}`} stroke={G} strokeWidth="2" pathLength={1} style={draw(1.6, 6)} />

      {stages.map((s, i) => {
        const cap = i === 3 || i === 4
        const d = 1.8 + i * 0.75 + (i > 3 ? 0.4 : 0)
        return (
          <g key={s} style={fade(d)}>
            <circle cx={nx(i)} cy={AX} r="5" fill={cap ? "#f08921" : "#0b0e0d"} stroke={cap ? "#f08921" : "#fff"} />
            <text x={nx(i)} y={AX + 30} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" letterSpacing="1.4" className={small}>
              0{i + 1}
            </text>
            <text x={nx(i)} y={AX + 47} textAnchor="middle" fill="rgba(255,255,255,0.88)" fontSize="10" letterSpacing="1" className={small}>
              {s.split(" ")[0]}
            </text>
            {s.includes(" ") && (
              <text x={nx(i)} y={AX + 61} textAnchor="middle" fill="rgba(255,255,255,0.88)" fontSize="10" letterSpacing="1" className={small}>
                {s.split(" ")[1]}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
