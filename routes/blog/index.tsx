import { fetchMarkdown } from '../../src/markdown.ts';
import { getPosts } from '../../src/data.ts';
import { Card, Footer, Header, Main, Markdown, Text } from 'lunchbox';
import PostInfo from '../../components/PostInfo.tsx';

export default async function BlogIndex() {
  const posts = await getPosts();
  const intro = await fetchMarkdown('../data/docs/blog/intro.md');

  return (
    <>
      <Header gradient_pattern='zigzag' layout_type='center'>
        <Text type='display'>Blog posts</Text>
        <Markdown markdown_content={intro} />
      </Header>
      <Main layout_type='center'>
        {posts.map((post) => (
          <Card>
            <PostInfo post={post} />
          </Card>
        ))}
      </Main>
      <Footer gradient_pattern='zigzag' layout_type='left'></Footer>
    </>
  );
}
