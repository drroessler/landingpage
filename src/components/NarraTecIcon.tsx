export default function NarraTecIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      {/* Left: Angedeutete Textzeilen (Narrativ / Fließtext) */}
      <rect x="2" y="5" width="14" height="2.5" rx="1.25" fill="currentColor" opacity="0.4" />
      <rect x="2" y="11.5" width="10" height="2.5" rx="1.25" fill="currentColor" opacity="0.4" />
      <rect x="2" y="18" width="12" height="2.5" rx="1.25" fill="currentColor" opacity="0.4" />
      <rect x="2" y="24.5" width="8" height="2.5" rx="1.25" fill="currentColor" opacity="0.4" />
      <rect x="2" y="31" width="13" height="2.5" rx="1.25" fill="currentColor" opacity="0.4" />
      <rect x="2" y="37.5" width="9" height="2.5" rx="1.25" fill="currentColor" opacity="0.4" />
      {/* Diagonal: Blitz / Brücke (die Methode als Verbindung) */}
      <path
        d="M14 8L22 20L18 20L34 42"
        stroke="#B91C1C"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right: Kräftiger Pfeil nach oben (Umsetzung) */}
      <path d="M38 6L30 18L34 18L34 42L42 42L42 18L46 18Z" fill="#B91C1C" />
    </svg>
  );
}
