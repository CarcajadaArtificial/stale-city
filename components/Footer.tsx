import { Footer, Link, Text } from 'lunchbox';

export default function () {
  return (
    <Footer gradient_pattern='zigzag' layout_type='center'>
      <Text>
        <Link href='./'>stale.city</Link>
        <>{' | '}</>
        <Link href='./blog'>Blog</Link>
        <>{' | '}</>
        <Link href='./resume'>Resume</Link>
      </Text>
      <Text class='mt-6'>
        <>Powered by</>
        <>{' '}</>
        <Link href='https://github.com/CarcajadaArtificial'>myself</Link>
      </Text>
      <Text type='small'>
        MIT License Copyright (c) 2023 Oscar Alfonso Guerrero Nuñez
      </Text>
    </Footer>
  );
}
