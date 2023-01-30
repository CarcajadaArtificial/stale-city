import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost, Post } from "../utils/posts.ts";
import { render } from "gfm";
import {
  Footer,
  Header,
  Layout,
  Link,
  Main,
  Navigation,
  Page,
  Text,
} from "../deps.ts";

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.slug);
    if (post === null) return ctx.renderNotFound();
    return ctx.render(post);
  },
};

export default function PostPage(props: PageProps<Post>) {
  const post = props.data;
  return (
    <Page darkMode>
      <Navigation fixed>
        <Link href="/">Home</Link>
        <Text>{post.title}</Text>
      </Navigation>
      <Header>
        <Text type="title">{post.title}</Text>
        <Text>
          <time>
            {new Date(post.published_at).toLocaleDateString("en-us", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </Text>
      </Header>
      <Main>
        <Layout type="left">
          <div
            class="mt-8 markdown-prose"
            dangerouslySetInnerHTML={{ __html: render(post.content) }}
          />
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
