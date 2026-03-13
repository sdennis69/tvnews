/**
 * RevcontentWidget
 *
 * Handles the full lifecycle of the Revcontent ad widget across Next.js
 * client-side navigations.
 *
 * Problem: Next.js uses client-side routing — when a user clicks a Link,
 * the page content is swapped without a full browser reload. The Revcontent
 * script is already in the DOM from the previous page, but the widget <div>
 * it targets is a brand new element. The script never re-scans for new
 * containers, so the widget silently fails to render.
 *
 * Solution:
 * 1. On mount: load the script (deferred until after window.load for LCP)
 * 2. On every routeChangeComplete: clear the container and re-trigger the
 *    widget by removing + re-adding the script tag, forcing Revcontent to
 *    re-scan the DOM.
 * 3. On unmount: clean up router listener.
 */

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

const SCRIPT_SRC = 'https://delivery.revcontent.com/155408/289858/widget.js'
const PUB_ID = '155408'
const WIDGET_ID = '289858'

interface Props {
  /** Additional className for the outer wrapper */
  className?: string
}

export default function RevcontentWidget({ className }: Props) {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  function loadWidget() {
    if (!containerRef.current) return

    // Remove any previously injected Revcontent script so it re-runs fresh
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`)
    if (existing) existing.remove()

    // Clear the container so Revcontent doesn't find stale rendered content
    containerRef.current.innerHTML = ''

    // Re-create the data-attribute div that Revcontent targets
    const widgetDiv = document.createElement('div')
    widgetDiv.setAttribute('data-widget-host', 'revcontent')
    widgetDiv.setAttribute('data-pub-id', PUB_ID)
    widgetDiv.setAttribute('data-widget-id', WIDGET_ID)
    containerRef.current.appendChild(widgetDiv)

    // Inject the script — Revcontent will scan the DOM and initialize
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    document.body.appendChild(script)
  }

  useEffect(() => {
    // Initial load: defer until after window.load so we don't block LCP
    const init = () => loadWidget()

    if (document.readyState === 'complete') {
      // Page already loaded (e.g. client-side navigation arrived here)
      init()
    } else {
      window.addEventListener('load', init, { once: true })
    }

    // Re-initialize on every subsequent client-side navigation
    // routeChangeComplete fires after the new page content is in the DOM
    const handleRouteChange = () => {
      // Small delay to let React finish rendering the new page's DOM
      setTimeout(loadWidget, 100)
    }
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      window.removeEventListener('load', init)
      router.events.off('routeChangeComplete', handleRouteChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={className}
      // CLS fix: reserve space so the widget expanding doesn't shift layout
      style={{ minHeight: '600px', contain: 'layout' }}
    >
      {/* Widget div is injected programmatically by loadWidget() */}
      <div ref={containerRef} />
    </div>
  )
}
