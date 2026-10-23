import Nav from "../components/Nav"
import Footer from "../components/Footer"
import Hero from "../sections/Hero"
import Trust from "../sections/Trust"
import Lifecycle from "../sections/Lifecycle"
import TwoSides from "../sections/TwoSides"
import RealEconomy from "../sections/RealEconomy"
import TransactionView from "../sections/TransactionView"
import OrderBand from "../components/OrderBand"
import Intelligence from "../sections/Intelligence"
import Proof from "../sections/Proof"
import FinalCta from "../sections/FinalCta"

export default function Home() {
  return (
    <div id="top">
      <Nav />
      <main>
        <Hero />
        <Trust />
        <Lifecycle />
        <TwoSides />
        <RealEconomy />
        <OrderBand />
        <TransactionView />
        <Intelligence />
        <Proof />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
