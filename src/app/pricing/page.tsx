import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

const plans = [
  {
    name: "Team",
    price: "Talk to us",
    copy: "For operators running a focused lane set.",
    items: ["Command Center", "Booking compare", "Exception inbox"],
  },
  {
    name: "Network",
    price: "Custom",
    copy: "For forwarders and 3PLs with multi-node freight.",
    items: ["Intelligence layer", "Document vault", "Network analytics"],
  },
];

export default function PricingPage() {
  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-[1100px] px-5 py-20 md:px-8">
      <Eyebrow>Pricing</Eyebrow>
      <h1 className="max-w-[14ch] text-[46px] font-semibold tracking-[-0.03em] md:text-[64px]">
        Pay for control, not another portal.
      </h1>
      <p className="mt-4 max-w-[36em] text-[17px] text-[var(--text-secondary)]">
        Pricing is scoped to your lanes and volume. These are starting shapes, not a public rate card.
      </p>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {plans.map((plan) => (
          <article key={plan.name} className="panel p-6">
            <p className="mono text-[12px] text-[var(--cyan)]">{plan.name}</p>
            <p className="mt-3 text-[32px] font-semibold">{plan.price}</p>
            <p className="mt-2 text-[15px] text-[var(--text-secondary)]">{plan.copy}</p>
            <ul className="mt-6 space-y-2 text-[15px]">
              {plan.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/access/">Request access</Button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
