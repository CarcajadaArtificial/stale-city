import InitSentry from "islands/InitSentry.tsx";
import Keynav from "islands/Keynav.tsx";
import type { PageProps } from "fresh";
import Footer from "components/Footer.tsx";

export default async function App({ Component }: PageProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="follow.it-verification-code"
          content="1JMgJkN2gsvDAHC02H1H"
        />
        <title>Stale City</title>
        <link rel="stylesheet" href="/styles.css" />

        {/* Favicons */}
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="StaleCity" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body>
        <Component />
        <Footer
          footerContent={await Deno.readTextFile("./data/docs/blog/footer.md")}
        />
        <Keynav padding={100} />
        <InitSentry
          dsn={Deno.env.get("SENTRY_DSN")!}
          env={Deno.env.get("ENV")!}
        />
      </body>
    </html>
  );
}
