import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Ambience from "../components/Ambience";
import Bio from "../components/Bio";
import Transformations from "../components/Transformations";
import Reels from "../components/Reels";
import Plans from "../components/Plans";
import CTA from "../components/CTA";
import Agendar from "../components/Agendar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Reels />
      <Services />
      <Ambience />
      <Bio />
      <Transformations />
      <Plans />
      <CTA />
      <Agendar />
      <Footer />
    </>
  );
}
