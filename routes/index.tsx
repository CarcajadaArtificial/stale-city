import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts, Post } from "../utils/posts.ts";
import {
  Card,
  Footer,
  Layout,
  Link,
  Main,
  Page,
  Separator,
  Text,
} from "../deps.ts";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts();
    return ctx.render(posts);
  },
};

export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <Page darkMode>
      <Main>
        <Layout type="center">
          <Card>
            <Text type="title">Blog</Text>
            {posts.map((post) => (
              <div>
                <Separator />
                <PostCard post={post} />
              </div>
            ))}
          </Card>
        </Layout>
      </Main>
      <Footer madeWithFresh>
        <Text>
          Created by{" "}
          <Link href="https://github.com/CarcajadaArtificial">
            Oscar Alfonso Guerrero
          </Link>
        </Text>
      </Footer>
    </Page>
  );
}

function PostCard(props: { post: Post }) {
  const { post } = props;
  return (
    <Link nostyle href={`/${post.slug}`}>
      <Text type="heading">{post.title}</Text>
      <Text>
        <time>
          {new Date(post.published_at).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </Text>
      <Text>
        {post.snippet}
      </Text>
    </Link>
  );
}
