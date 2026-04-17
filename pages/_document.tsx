import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/*
         * Performance: Pre-warm connections to 3rd-party ad/widget domains.
         * preconnect opens the TCP+TLS handshake early so when the deferred
         * Revcontent script fires after window.load, the connection is ready.
         * This cuts the "resource load delay" flagged by PageSpeed.
         */}
        {/* Pre-warm connection to WordPress image origin for faster LCP image download */}
        <link rel="preconnect" href="https://tvnews2.wpenginepowered.com" />
        <link rel="dns-prefetch" href="https://tvnews2.wpenginepowered.com" />
        {/* Pre-warm connections to Revcontent ad domains (deferred script) */}
        <link rel="preconnect" href="https://delivery.revcontent.com" />
        <link rel="dns-prefetch" href="https://delivery.revcontent.com" />
        <link rel="dns-prefetch" href="https://trends.revcontent.com" />
        <link rel="dns-prefetch" href="https://api.revcontent.com" />
      </Head>
      <body>
        {/*
         * Blocking theme script — runs synchronously before first paint.
         * Reads localStorage and applies .dark class immediately so there
         * is no flash of light mode. Default is dark if no preference saved.
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  try {
    var t = localStorage.getItem('wway-theme');
    if (t === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {
    document.documentElement.classList.add('dark');
  }
})();
`,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
