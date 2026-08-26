import { Eyebrow } from "@/components/ui/Eyebrow";

export default function AccessPage() {
  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-[720px] px-5 py-20 md:px-8">
      <Eyebrow>Request access</Eyebrow>
      <h1 className="text-[46px] font-semibold tracking-[-0.03em] md:text-[64px]">Start with one workspace.</h1>
      <p className="mt-4 text-[17px] text-[var(--text-secondary)]">
        Name, work email, and company. This preview does not send. Use the address you want us to reply to.
      </p>
      <form className="mt-10 space-y-6" action="#" method="post">
        <label className="block">
          <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--text-muted)]">Name</span>
          <input
            required
            name="name"
            autoComplete="name"
            className="mt-2 h-14 w-full rounded-[12px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 text-[16px]"
          />
        </label>
        <label className="block">
          <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--text-muted)]">Work email</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            className="mt-2 h-14 w-full rounded-[12px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 text-[16px]"
          />
        </label>
        <label className="block">
          <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--text-muted)]">Company</span>
          <input
            required
            name="company"
            autoComplete="organization"
            className="mt-2 h-14 w-full rounded-[12px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 text-[16px]"
          />
        </label>
        <button
          type="submit"
          className="inline-flex min-h-11 items-center rounded-[12px] bg-[var(--blue)] px-5 text-[13px] font-semibold text-[#07090D]"
        >
          Request access
        </button>
      </form>
    </main>
  );
}
