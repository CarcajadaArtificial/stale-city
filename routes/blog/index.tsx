import { fetchMarkdown } from '../../src/markdown.ts';
import { getPosts } from '../../src/data.ts';
import { Card, Header, Main, Markdown, Text } from 'lunchbox';
import PostInfo from '../../components/PostInfo.tsx';
import Navigation from '../../components/Navigation.tsx';
import Footer from '../../components/Footer.tsx';

export default async function BlogIndex() {
  const posts = await getPosts();
  const intro = await fetchMarkdown('../data/docs/blog/intro.md');

  return (
    <>
      <Navigation />
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
      <Footer />
    </>
  );
}
