/**
 * Hydration-safe timestamp utilities.
 *
 * React error #425 is caused by calling Date.now() during render — the server
 * computes one value, the browser computes a different one milliseconds later,
 * and React detects the mismatch and throws.
 *
 * The fix: always render a STABLE string on both server and client during the
 * initial render pass. After hydration, a useEffect updates to relative time.
 */
import { useState, useEffect } from 'react'

/** Stable formatted date — identical on server and client. */
export function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return dateStr
  }
}

/** Relative time — ONLY safe to call inside useEffect (client-side). */
export function timeAgoClient(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

/**
 * <TimeStamp dateStr="2026-04-17T12:00:00" />
 *
 * Renders a stable formatted date on SSR, then updates to relative time
 * (e.g. "2h ago") after hydration via useEffect.
 */
export function TimeStamp({ dateStr }: { dateStr: string }) {
  const [label, setLabel] = useState(() => formatDate(dateStr))
  useEffect(() => {
    setLabel(timeAgoClient(dateStr))
  }, [dateStr])
  return <>{label}</>
}
