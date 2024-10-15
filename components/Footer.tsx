import Footer from "lunchbox/components/Footer/index.tsx";
import Layout from "lunchbox/components/Layout/index.tsx";
import Module from "lunchbox/components/Module/index.tsx";
import Pattern from "lunchbox/components/Pattern/index.tsx";
import Text from "lunchbox/components/Text/index.tsx";
import Link from "lunchbox/components/Link/index.tsx";

export default function () {
  return (
    <>
      <Pattern flip type="zigzag" />
      <Footer>
        <Layout whitespace>
          <Module size="sm">
            <Text type="small" noMargins>v0.0.41</Text>
          </Module>
          <Module size="lg">
            <Text>
              <Link href="https://github.com/CarcajadaArtificial">
                GitHub
              </Link>
              <>{" | "}</>
              <Link href="https://twitter.com/poncho_tuiteo">Twitter</Link>
              <>{" | "}</>
              <Link href="/rss.xml">RSS</Link>
            </Text>
          </Module>
        </Layout>
      </Footer>
    </>
  );
}
