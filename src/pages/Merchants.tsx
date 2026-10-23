import Nav from "../components/Nav"
import Footer from "../components/Footer"
import MerHero from "../merchants/MerHero"
import Incomplete from "../merchants/Incomplete"
import Brings from "../merchants/Brings"
import Lifecycle from "../merchants/Lifecycle"
import Instruments from "../merchants/Instruments"
import MerSectors from "../merchants/MerSectors"
import MerIntel from "../merchants/MerIntel"
import Faq from "../merchants/Faq"
import MerCta from "../merchants/MerCta"

export default function Merchants() {
  return (
    <div id="top">
      <Nav />
      <main>
        <MerHero />
        <Incomplete />
        <Brings />
        <Lifecycle />
        <Instruments />
        <MerSectors />
        <MerIntel />
        <Faq />
        <MerCta />
      </main>
      <Footer />
    </div>
  )
}
