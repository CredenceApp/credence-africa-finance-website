import Reveal from "../components/Reveal"
import ProductShot, { ShotNote } from "../components/ProductShot"

export default function IntProduct() {
  return (
    <section className="section-y bg-stone text-near-black">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow text-near-black/55">Portfolio Intelligence</p>
          <h2 className="display-section mt-5 max-w-[52rem]">Move from transaction visibility to portfolio visibility.</h2>
        </Reveal>

        <div className="mt-12 md:mt-14">
          <ProductShot
            mobile={["08M-intelligence-portfolio@3x.png", 1290, 1782]}
            alt="Credence Intelligence portfolio view."
            className="mx-auto max-w-md md:hidden"
          />
          <div className="hidden gap-6 md:grid lg:grid-cols-[1.9fr_1fr] lg:items-center lg:gap-8">
            <ProductShot
              desktop={["08P-financier-portfolio-primary@2x.png", 2088, 1600]}
              alt="Financier portfolio view showing transactions, progress, capital deployed and status across the portfolio."
            />
            <div>
              <p className="eyebrow mb-4 text-near-black/55">Internal Credence views</p>
              <div className="grid grid-cols-2 items-center gap-6 lg:grid-cols-1 lg:gap-8">
                <ProductShot delay={200} desktop={["03-internal-assessment-summary@3x.png", 1290, 1152]} alt="Credence internal assessment summary." />
                <ProductShot delay={400} desktop={["08S-internal-monitoring-checks@3x.png", 1290, 780]} alt="Credence internal monitoring checks." />
              </div>
            </div>
          </div>
          <ShotNote className="mt-6" />
        </div>
      </div>
    </section>
  )
}
