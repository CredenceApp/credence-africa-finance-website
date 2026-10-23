import Button from "../components/Button"
import TradeField from "../components/TradeField"
import TradeFieldMobile from "../components/TradeFieldMobile"
import HeroVideo from "../components/HeroVideo"
import { getStarted, goto } from "../links"

const rise = (d: number) => ({ animation: `rise .9s cubic-bezier(0.65,0,0.35,1) ${d}s both` })

export default function Hero() {
  return (
    <section className="relative flex flex-col overflow-hidden bg-near-black text-white lg:min-h-[100svh] lg:justify-center">
      <div className="hairline-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_right,transparent,black_70%)]" />

      <div className="relative order-2 aspect-[16/10] w-full overflow-hidden sm:aspect-[16/8] lg:absolute lg:inset-y-0 lg:right-0 lg:order-none lg:aspect-auto lg:w-[62%] lg:[mask-image:linear-gradient(to_right,transparent,black_18%)]">
        <HeroVideo className="absolute inset-0 size-full object-cover object-[70%_50%] [filter:hue-rotate(-62deg)_saturate(0.75)_brightness(0.88)_contrast(0.98)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-green to-deep-green opacity-50 mix-blend-multiply" />
        <div className="pointer-events-none absolute inset-0 bg-green/15" />
        <div
          className="pointer-events-none absolute inset-0 mix-blend-screen"
          style={{ background: "radial-gradient(45% 55% at 62% 48%, rgba(46,95,87,0.45), transparent 70%)" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-near-black via-transparent to-near-black opacity-90 lg:hidden" />
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{ background: "radial-gradient(60% 65% at 72% 55%, rgba(11,14,13,0.4), transparent 75%)" }}
        />
        <div className="pointer-events-none absolute inset-0 lg:hidden">
          <TradeFieldMobile />
        </div>
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-near-black via-near-black/55 via-35% to-transparent to-75% lg:block" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(14,36,32,0.85), transparent 28%, transparent 68%, rgba(11,14,13,0.95)), linear-gradient(to left, rgba(14,36,32,0.75), transparent 22%)",
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 hidden opacity-[0.55] lg:block [mask-image:linear-gradient(to_right,transparent_52%,black_62%)]">
        <TradeField />
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[55%] bg-gradient-to-r from-near-black via-near-black/60 to-transparent lg:block" />

      <div className="wrap relative order-1 pt-32 pb-12 lg:order-none lg:pb-44">
        <div className="max-w-[44rem]">
          <p className="eyebrow text-orange" style={rise(0)}>
            Trade finance infrastructure
          </p>
          <h1 className="mt-6 text-[clamp(2.75rem,6vw,5.25rem)] leading-[1.02] tracking-[-0.04em]" style={rise(0.1)}>
            Real trade.
            <br />
            Structured for capital.
          </h1>
          <p className="mt-8 max-w-[34rem] text-base leading-relaxed text-white/65 md:text-[17px]" style={rise(0.2)}>
            Credence structures real economy trade opportunities for execution and financing, bringing together verification, transaction intelligence, capital and lifecycle visibility from opportunity through settlement.
          </p>
          <div className="mt-10 flex flex-wrap gap-3" style={rise(0.3)}>
            <Button variant="light" onClick={() => getStarted()}>Get Started</Button>
            <Button variant="outline-dark" onClick={() => goto("#/financiers")}>For Financiers</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
