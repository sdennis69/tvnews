/**
 * BreakingNewsTicker — WWAYTV3
 * Matches local-stream-vision Lovable reference exactly.
 * Red gradient bar, AlertTriangle icon, 45s CSS scroll animation.
 */

interface Props {
  items?: string[]
}

const DEFAULT_ITEMS = [
  'BREAKING: Tropical storm watch issued for the Golden Triangle area',
  'I-82 EB reopened after morning crash near exit 45',
  'Columbus City Council approves new downtown development plan',
  'High school football scoreboard: WWAYTV3 Friday Night Lights',
  'Power restored to thousands of customers in Lowndes County',
]

export default function BreakingNewsTicker({ items = DEFAULT_ITEMS }: Props) {
  const doubled = [...items, ...items]
  return (
    <div
      className="overflow-hidden"
      style={{
        background: 'linear-gradient(90deg, hsl(0 78% 42%), hsl(0 84% 52%))',
        color: 'hsl(var(--breaking-foreground))',
      }}
    >
      <div
        className="max-w-[1400px] mx-auto px-8 flex items-stretch gap-3"
        style={{ height: '2.5rem' }}
      >
        {/* Label */}
        <div
          className="flex items-center gap-2 pr-3 font-bold text-xs uppercase tracking-wider shrink-0"
          style={{ borderRight: '1px solid rgba(255,255,255,0.3)' }}
        >
          {/* AlertTriangle inline SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Breaking</span>
        </div>
        {/* Scrolling track */}
        <div className="flex-1 overflow-hidden relative">
          <div className="ticker-track flex items-center gap-10 whitespace-nowrap absolute inset-y-0 left-0 will-change-transform">
            {doubled.map((t, i) => (
              <span key={i} className="text-sm font-medium opacity-95">
                • {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
