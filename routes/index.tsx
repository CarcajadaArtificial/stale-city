import Header from "lunchbox/components/Header/index.tsx";
import Main from "lunchbox/components/Main/index.tsx";
import Layout from "lunchbox/components/Layout/index.tsx";
import Pattern from "lunchbox/components/Pattern/index.tsx";
import Module from "lunchbox/components/Module/index.tsx";
import Text from "lunchbox/components/Text/index.tsx";
import Code from "lunchbox/components/Code/index.tsx";
import Link from "lunchbox/components/Link/index.tsx";
import Footer from "@/components/Footer.tsx";

function HomeHeader() {
  return (
    <>
      <Header banner>
        <Layout whitespace>
          <Module size="xs" />
          <Module size="lg">
            <div class="text-center">
              <Text type="display">stale.city</Text>
              <img
                src="https://raw.githubusercontent.com/CarcajadaArtificial/CarcajadaArtificial/main/images/stalecity.svg"
                alt="stale city logo"
                class="mx-auto mb-6 w-48"
              />
              <Text>
                <>Hello</> <Code>( ´ ω ` )ノﾞ</Code>{" "}
                <>
                  welcome to my personal page. My name is Oscar Alfonso
                  Guerrero, but I also go by
                </>
                <>{" "}</>
                <Link href="https://github.com/CarcajadaArtificial">
                  CarcajadaArtificial
                </Link>
                <>{" "}</>
                <>on GitHub.</>
              </Text>
              <Text class="my-3 text-center">
                <Link href="./resume">Resume</Link>
                <>{" | "}</>
                <Link href="./posts">Thoughts</Link>
                <>{" | "}</>
                <Link href="https://github.com/CarcajadaArtificial">
                  Projects
                </Link>
              </Text>
            </div>
          </Module>
        </Layout>
      </Header>
      <Pattern type="zigzag" />
    </>
  );
}

export default function () {
  return (
    <div>
      <HomeHeader />
      <Main>
        <Layout whitespace>
          <Module>
            <Text>Main</Text>
          </Module>
        </Layout>
      </Main>
      <Footer />
    </div>
  );
}
