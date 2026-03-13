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
