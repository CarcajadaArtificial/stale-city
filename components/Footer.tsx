import Footer from "lunchbox/components/Footer/index.tsx";
import Layout from "lunchbox/components/Layout/index.tsx";
import Module from "lunchbox/components/Module/index.tsx";
import Pattern from "lunchbox/components/Pattern/index.tsx";
import Text from "lunchbox/components/Text/index.tsx";

export default function () {
  return (
    <>
      <Pattern flip type="zigzag" />
      <Footer>
        <Layout whitespace>
          <Module size="sm">
            <Text type="small" noMargins>v0.0.32</Text>
          </Module>
          <Module size="lg"></Module>
        </Layout>
      </Footer>
    </>
  );
}
