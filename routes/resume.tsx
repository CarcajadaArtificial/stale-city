import { fetchMarkdown } from '../src/markdown.ts';
import { getTimelineEvents } from '../src/data.ts';
import { Footer, Header, Link, Main, Markdown, Text } from 'lunchbox';
import TimelineEvent from '../islands/TimelineEvent.tsx';

export default async function Resume() {
  const md_bio = await fetchMarkdown('../data/docs/resume/bio.md');
  const timeline = await getTimelineEvents();

  return (
    <>
      <Header layout_type='center' gradient_pattern='zigzag'>
        <>
          <Text type='display'>Resume</Text>
          <Text class='mb-6'>
            <Link href='./cv_oscar_guerrero.pdf'>
              Download English 1-Page PDF
            </Link>
          </Text>
          <Markdown markdown_content={md_bio} />
          <div class='h-6' />
        </>
      </Header>
      <Main layout_type='center'>
        {timeline.map((event) => <TimelineEvent md={event} />)}
      </Main>
      <Footer gradient_pattern='zigzag'>
      </Footer>
    </>
  );
}
