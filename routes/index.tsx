import { Code, Footer, Header, Link, Main, Separator, Text } from 'lunchbox';

export default function Home() {
  return (
    <>
      <Header gradient_pattern='zigzag' banner layout_type='center'>
        <Text type='display' class='text-center'>Stale City</Text>
        <img
          src='https://raw.githubusercontent.com/CarcajadaArtificial/CarcajadaArtificial/main/images/stalecity.svg'
          alt='stale city logo'
          class='mx-auto mb-6 w-48'
        />
        <Text class='text-center'>
          <>Hello</>
          <Code>( ´ ω ` )ノﾞ</Code>
          <>, welcome to my personal page.</>
          <br />
          <>My name is Oscar Alfonso Guerrero, but I also go by</>
          <Link href='https://github.com/CarcajadaArtificial'>
            &nbsp;CarcajadaArtificial&nbsp;
          </Link>
          <>on GitHub.</>
        </Text>
        <Separator />
        <Text class='text-center animate-float'>
          <>Scroll down to see about my work and thoughts.</>
          <br />
          <>⌄</>
        </Text>
      </Header>
      <Main layout_type='left'></Main>
      <Footer gradient_pattern='zigzag' layout_type='left'></Footer>
    </>
  );
}
