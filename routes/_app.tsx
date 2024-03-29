import { AppProps } from '$fresh/server.ts';
import { Head } from '$fresh/runtime.ts';

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <title>Stale City</title>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/gh/CarcajadaArtificial/lunchbox@0.2.4/static/style.css'
        />
        <link rel='stylesheet' href='style.css' />
      </Head>
      <body class='clr-bg-panel clr-txt-base txt-paragraph'>
        <Component />
      </body>
    </>
  );
}
