import { AppProps } from '$fresh/server.ts';
import { Head } from '$fresh/runtime.ts';

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <title>Stale City</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/CarcajadaArtificial/lunchbox@0.1.13/static/style.css"
        />
      </Head>
      <body class="clr-bg-panel clr-txt-base txt-paragraph">
        <div class="_screen">
          <Component />
        </div>
      </body>
    </>
  );
}
