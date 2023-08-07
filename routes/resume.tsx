import { fetchMarkdown } from '../src/markdown.ts';
import { Footer, Header, Link, Main, Markdown, Text } from 'lunchbox';

export default async function Resume() {
  const md_bio = await fetchMarkdown('../data/docs/resume/bio.md');

  return (
    <>
      <Header layout_type='left' gradient_pattern='zigzag'>
        <>
          <Text type='display'>Resume</Text>
          <Text class='mb-6'>
            <Link>English PDF</Link>
            <>{' | '}</>
            <Link>Spanish PDF</Link>
          </Text>
          <Markdown markdown_content={md_bio} />
          <div class='h-6' />
        </>
      </Header>
      <Main>
      </Main>
      <Footer gradient_pattern='zigzag'>
      </Footer>
    </>
  );
}
