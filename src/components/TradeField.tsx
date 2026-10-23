import type { CSSProperties } from "react"
import { EASE } from "../hooks"

const frags = [
  { t: "Buyer", dx: -50, dy: -60, r: -6 },
  { t: "Supplier", dx: 90, dy: 40, r: 5 },
  { t: "Purchase order", dx: -30, dy: 80, r: 4 },
  { t: "Invoice", dx: 110, dy: -50, r: -5 },
  { t: "Delivery terms", dx: -70, dy: 20, r: 7 },
  { t: "Counterparty info", dx: 60, dy: 90, r: -4 },
]
const dust = [
  [930, 560], [1010, 610], [1090, 575], [1180, 650], [1010, 720], [1110, 745], [900, 680],
]
const G = "#4f8a7e"
const X = 1340

const draw = (dur: number, delay: number) => ({
  strokeDasharray: 1,
  strokeDashoffset: 1,
  animation: `draw ${dur}s ${EASE} ${delay}s forwards`,
})
const fade = (delay: number, dur = 0.8) => ({ opacity: 0, animation: `fade ${dur}s ${EASE} ${delay}s forwards` })
const fy = (i: number) => 230 + i * 48

function Stage({ n, label, x, y, anchor = "start", delay }: { n: string; label: string; x: number; y: number; anchor?: "start" | "middle" | "end"; delay: number }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize="11" letterSpacing="1.8" className="font-sans uppercase" style={fade(delay)}>
      <tspan fill="rgba(255,255,255,0.3)">{n}  </tspan>
      <tspan fill="rgba(255,255,255,0.72)">{label}</tspan>
    </text>
  )
}

export default function TradeField() {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMaxYMid slice"
      className="absolute inset-0 size-full"
      fill="none"
      role="img"
      aria-label="Illustrative transaction path in seven stages: trade opportunity from the merchant, verification, structure, capital entering from the financier, execution, monitoring and settlement."
    >
      <g stroke="rgba(255,255,255,0.04)" strokeWidth="1">
        <path d="M880 350 H1440" />
        <path d="M1170 190 V790" />
        {[560, 640, 720].map((y) => (
          <path key={y} d={`M900 ${y} H1260`} strokeDasharray="2 10" />
        ))}
      </g>

      {dust.map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} h${6 + (i % 3) * 5}`} stroke="rgba(255,255,255,0.1)" style={fade(1.2 + i * 0.12, 1.4)} />
      ))}

      <Stage n="01" label="Trade opportunity" x={880} y={168} delay={0.4} />
      <text x="880" y="186" fill="rgba(255,255,255,0.3)" fontSize="11" letterSpacing="1.4" className="font-sans uppercase" style={fade(0.5)}>
        Merchant
      </text>

      {frags.map((f, i) => {
        const y = fy(i)
        return (
          <g key={f.t}>
            <g transform={`translate(880 ${y})`}>
              <g
                style={
                  {
                    "--dx": `${f.dx}px`,
                    "--dy": `${f.dy}px`,
                    "--r": `${f.r}deg`,
                    animation: `fragment 1.5s ${EASE} ${0.5 + i * 0.09}s both`,
                  } as CSSProperties
                }
              >
                <rect x="0" y="-3" width="6" height="6" stroke="rgba(255,255,255,0.35)" />
                <text x="18" y="4" fill="rgba(255,255,255,0.42)" fontSize="11" letterSpacing="1.4" className="font-sans uppercase">
                  {f.t}
                </text>
              </g>
            </g>
            <path d={`M1040 ${y} H1170`} stroke="rgba(255,255,255,0.2)" pathLength={1} style={draw(1.1, 1.8 + i * 0.1)} />
            <circle cx="1170" cy={y} r="2.5" fill="rgba(255,255,255,0.6)" style={fade(2.7 + i * 0.1)} />
          </g>
        )
      })}

      <path d="M1170 230 V470" stroke={G} strokeWidth="1.5" pathLength={1} style={draw(1, 2.6)} />
      <Stage n="02" label="Verification" x={1170} y={190} anchor="middle" delay={2.8} />

      <path d="M1170 350 H1340" stroke={G} strokeWidth="2" pathLength={1} style={draw(1, 3.4)} />
      <Stage n="03" label="Structure" x={1190} y={334} delay={3.9} />

      <path d={`M1440 235 H${X} V350`} stroke="#f08921" strokeWidth="2" pathLength={1} style={draw(1.1, 4.1)} />
      <circle cx={X} cy="350" r="4.5" fill="#f08921" style={fade(5)} />
      <text x="1424" y="219" textAnchor="end" fontSize="11" letterSpacing="1.8" className="font-sans uppercase" style={fade(4.6)}>
        <tspan fill="rgba(255,255,255,0.3)">04  </tspan>
        <tspan fill="#f08921">Capital</tspan>
      </text>
      <text x="1424" y="256" textAnchor="end" fill="rgba(255,255,255,0.32)" fontSize="11" letterSpacing="1.4" className="font-sans uppercase" style={fade(4.7)}>
        Financier
      </text>

      <path d={`M${X} 350 V790`} stroke={G} strokeWidth="2" pathLength={1} style={draw(1.8, 5)} />

      <circle cx={X} cy="510" r="4.5" fill="#0b0e0d" stroke="#fff" style={fade(5.6)} />
      <Stage n="05" label="Execution" x={X - 18} y={514} anchor="end" delay={5.6} />

      <g style={fade(6.2)}>
        <circle cx={X} cy="640" r="4.5" fill="#0b0e0d" stroke="#fff" />
        <path d={`M${X + 8} 640 H1420`} stroke="rgba(255,255,255,0.2)" strokeDasharray="2 5" />
        <path d={`M${X + 8} 624 H1396`} stroke="rgba(255,255,255,0.12)" strokeDasharray="2 5" />
        <path d={`M${X + 8} 656 H1404`} stroke="rgba(255,255,255,0.12)" strokeDasharray="2 5" />
      </g>
      <Stage n="06" label="Monitoring" x={X - 18} y={644} anchor="end" delay={6.2} />

      <g style={fade(6.8)}>
        <circle cx={X} cy="790" r="9" fill="#173b35" stroke={G} strokeWidth="1.5" />
        <path d={`M${X - 4} 790 l3 3 l6 -7`} stroke="#fff" strokeWidth="1.6" />
      </g>
      <Stage n="07" label="Settlement" x={X - 22} y={794} anchor="end" delay={6.8} />
    </svg>
  )
}
