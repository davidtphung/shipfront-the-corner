import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { WhySection } from "@/components/WhySection";
import { Capabilities } from "@/components/Capabilities";
import { Intelligence } from "@/components/Intelligence";
import { Journey } from "@/components/Journey";

export default function Home() {
  return (
    <main id="main" tabIndex={-1}>
      <Hero />
      <TrustStrip />
      <WhySection />
      <Capabilities />
      <Intelligence />
      <Journey />
    </main>
  );
}
