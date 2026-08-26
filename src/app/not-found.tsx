import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-[720px] px-5 py-24">
      <Eyebrow>404</Eyebrow>
      <h1 className="text-[46px] font-semibold">Page not found</h1>
      <p className="mt-4 text-[var(--text-secondary)]">That route is not on this workspace.</p>
      <div className="mt-8">
        <Button href="/">Return home</Button>
      </div>
    </main>
  );
}
