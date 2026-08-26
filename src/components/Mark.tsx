export function Mark({ className = "h-7 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 32" fill="none" aria-hidden="true">
      <path
        d="M5 11 L33 6 L43 11.5 L43 24.5 L15 29.5 L5 24 Z"
        stroke="#5B7CFF"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M5 11 L15 15.4 L43 11.5" stroke="#53D9FF" strokeWidth="1.4" />
      <path d="M15 15.4 L15 29.5" stroke="#53D9FF" strokeWidth="1.4" />
      <path d="M9 13.2 L9 24.6" stroke="#53D9FF" strokeWidth="1" opacity="0.55" />
      <path d="M12 14.4 L12 26.2" stroke="#53D9FF" strokeWidth="1" opacity="0.35" />
      <path d="M36 13.2 L36 25.4" stroke="#A88BFF" strokeWidth="1" opacity="0.55" />
    </svg>
  );
}
