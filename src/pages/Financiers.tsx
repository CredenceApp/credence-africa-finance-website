import Nav from "../components/Nav"
import Footer from "../components/Footer"
import FinHero from "../financiers/FinHero"
import Origination from "../financiers/Origination"
import Dossier from "../financiers/Dossier"
import FileConsolidation from "../financiers/FileConsolidation"
import Participation from "../financiers/Participation"
import Control from "../financiers/Control"
import FinIntelligence from "../financiers/FinIntelligence"
import Memo from "../financiers/Memo"
import FinSectors from "../financiers/FinSectors"
import FinTrust from "../financiers/FinTrust"
import FinCta from "../financiers/FinCta"

export default function Financiers() {
  return (
    <div id="top">
      <Nav />
      <main>
        <FinHero />
        <Origination />
        <Dossier />
        <FileConsolidation />
        <Participation />
        <Control />
        <FinIntelligence />
        <Memo />
        <FinSectors />
        <FinTrust />
        <FinCta />
      </main>
      <Footer />
    </div>
  )
}
