import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import TrustBadges from "@/components/landing/TrustBadges";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B1120]">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <TrustBadges />
      </main>
      <Footer />
    </div>
  );
}
