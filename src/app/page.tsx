import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import Services from "@/components/Services";
import LiveDemoShowcase from "@/components/LiveDemoShowcase";
import Benefits from "@/components/Benefits";
import Portfolio from "@/components/Portfolio";
import AutomationAuditWizard from "@/components/AutomationAuditWizard";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Process />
        <Services />
        <LiveDemoShowcase />
        <Benefits />
        <Portfolio />
        <AutomationAuditWizard />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
