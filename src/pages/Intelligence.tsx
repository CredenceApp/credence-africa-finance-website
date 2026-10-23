import Nav from "../components/Nav"
import Footer from "../components/Footer"
import IntHero from "../intelligence/IntHero"
import Transform from "../intelligence/Transform"
import IntProduct from "../intelligence/IntProduct"
import TxnIntel from "../intelligence/TxnIntel"
import Counterparty from "../intelligence/Counterparty"
import Risk from "../intelligence/Risk"
import OneSystem from "../intelligence/OneSystem"
import ReportDownload from "../intelligence/ReportDownload"
import Perspective from "../intelligence/Perspective"
import IntCta from "../intelligence/IntCta"

export default function Intelligence() {
  return (
    <div id="top">
      <Nav />
      <main>
        <IntHero />
        <Transform />
        <TxnIntel />
        <Counterparty />
        <Risk />
        <IntProduct />
        <OneSystem />
        <ReportDownload />
        <Perspective />
        <IntCta />
      </main>
      <Footer />
    </div>
  )
}
