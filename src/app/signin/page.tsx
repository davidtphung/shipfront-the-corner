import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function SignInPage() {
  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-[520px] px-5 py-20 md:px-8">
      <Eyebrow>Sign in</Eyebrow>
      <h1 className="text-[42px] font-semibold tracking-[-0.03em]">Welcome back.</h1>
      <p className="mt-4 text-[16px] text-[var(--text-secondary)]">
        This preview does not authenticate. Request access if you do not have a workspace yet.
      </p>
      <form className="mt-10 space-y-6" action="#" method="post">
        <label className="block">
          <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--text-muted)]">Work email</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className="mt-2 h-14 w-full rounded-[12px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4"
          />
        </label>
        <button
          type="submit"
          className="inline-flex min-h-11 items-center rounded-[12px] bg-[var(--blue)] px-5 text-[13px] font-semibold text-[#07090D]"
        >
          Continue
        </button>
      </form>
      <p className="mt-6 text-[14px] text-[var(--text-muted)]">
        New to Shipfront? <Link href="/access/" className="text-[var(--cyan)]">Request access</Link>
      </p>
    </main>
  );
}
