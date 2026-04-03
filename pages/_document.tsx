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
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
