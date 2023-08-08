import { getPosts } from '../src/data.ts';
import {
  Card,
  Code,
  Footer,
  Header,
  Link,
  Main,
  Separator,
  Text,
} from 'lunchbox';
import PostInfo from '../components/PostInfo.tsx';

export default async function Home() {
  const posts = await getPosts();

  function RenderProjects() {
    const projects = [
      {
        name: 'Lunchbox',
        description: 'A component library tailor-made for Deno Fresh.',
        url: 'https://github.com/CarcajadaArtificial/lunchbox',
        image_url:
          'https://github.com/CarcajadaArtificial/CarcajadaArtificial/raw/main/images/lunchbox.svg',
      },
      {
        name: 'Sass-Door',
        description: 'A tiny error-handling and type safety SCSS library.',
        url: 'https://github.com/CarcajadaArtificial/sass-door',
        image_url:
          'https://github.com/CarcajadaArtificial/CarcajadaArtificial/raw/main/images/sassdoor.svg',
      },
      {
        name: 'GarliCSS',
        description: 'An SCSS library with utilities for design systems.',
        url: 'https://github.com/CarcajadaArtificial/garlicss',
        image_url:
          'https://github.com/CarcajadaArtificial/CarcajadaArtificial/raw/main/images/garlicss.svg',
      },
      {
        name: 'Pixie',
        description: 'An image into a dithered pixel-art SVG converter.',
        url: 'https://github.com/CarcajadaArtificial/pixie',
        image_url:
          'https://github.com/CarcajadaArtificial/CarcajadaArtificial/raw/main/images/pixie.svg',
      },
    ];

    return (
      <>
        {projects.map((project) => (
          <Card>
            <div class='flex'>
              <img
                src={project.image_url}
                alt={`${project.name} logo`}
                class='mb-3 w-32'
              />
              <div class='ml-6'>
                <Text noMargins type='subheading'>
                  <Link href={project.url}>{project.name}</Link>
                </Text>
                <Text noMargins>{project.description}</Text>
              </div>
            </div>
          </Card>
        ))}
      </>
    );
  }

  return (
    <>
      <Header gradient_pattern='zigzag' banner layout_type='center'>
        <Text type='display' class='text-center'>stale.city</Text>
        <img
          src='https://raw.githubusercontent.com/CarcajadaArtificial/CarcajadaArtificial/main/images/stalecity.svg'
          alt='stale city logo'
          class='mx-auto mb-6 w-48'
        />
        <Text class='text-center'>
          <>Hello</>
          <Code>( ´ ω ` )ノﾞ</Code>
          <>
            welcome to my personal page. My name is Oscar Alfonso Guerrero, but
            I also go by
          </>
          <>{' '}</>
          <Link href='https://github.com/CarcajadaArtificial'>
            CarcajadaArtificial
          </Link>
          <>{' '}</>
          <>on GitHub.</>
        </Text>
        <Text class='my-3 text-center'>
          <Link href='./resume'>Resume</Link>
          <>{' | '}</>
          <Link href='./blog'>Blog</Link>
          <>{' | '}</>
          <Link href='https://github.com/CarcajadaArtificial'>Projects</Link>
        </Text>
        <Separator />
        <Text class='text-center animate-float'>
          <>Scroll down to see about my work and thoughts.</>
          <br />
          <>⌄</>
        </Text>
      </Header>
      <Main layout_type='center'>
        <>
          <Text type='display'>Projects</Text>
          <RenderProjects />
          <Text type='display'>Thoughts</Text>
          {posts.map((post) => (
            <Card>
              <PostInfo post={post} />
            </Card>
          ))}
        </>
      </Main>
      <Footer gradient_pattern='zigzag' layout_type='left'></Footer>
    </>
  );
}
