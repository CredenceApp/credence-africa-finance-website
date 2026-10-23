export function Check({ className = "size-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} fill="none" aria-hidden>
      <path d="M2.5 6.5l2.2 2.2L9.5 3.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

export function Arrow({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" className={className} fill="none" aria-hidden>
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

export function StatusIcon({ kind }: { kind: "complete" | "progress" | "pending" }) {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5 shrink-0" fill="none" aria-hidden>
      {kind === "complete" && (
        <>
          <circle cx="7" cy="7" r="6.5" fill="#2e5f57" />
          <path d="M4 7.2l2 2L10 5" stroke="#fff" strokeWidth="1.4" />
        </>
      )}
      {kind === "progress" && (
        <>
          <circle cx="7" cy="7" r="6" stroke="#2e5f57" />
          <path d="M7 1a6 6 0 010 12z" fill="#2e5f57" />
        </>
      )}
      {kind === "pending" && <circle cx="7" cy="7" r="6" stroke="#737c78" />}
    </svg>
  )
}
