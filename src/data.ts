import { getMarkdown, getMarkdowns, MarkdownEssentials } from './markdown.ts';

interface Post {
  title: string;
  published_at: Date;
  last_edited_at: Date;
  snippet: string;
}

export type MdPost = MarkdownEssentials<Post>;

export const getPosts = (): Promise<MdPost[]> =>
  getMarkdowns<Post>(
    './data/posts',
    getPost,
    (a, b) => b.attrs.published_at.getTime() - a.attrs.published_at.getTime(),
  );

export async function getPost(
  slug: string,
): Promise<MdPost | null> {
  try {
    const { attrs, content } = await getMarkdown<Post>(
      './data/posts',
      slug,
    ) as MdPost;

    return {
      slug,
      content: content,
      attrs: {
        title: attrs.title as string | '',
        published_at: new Date(attrs.published_at as Date),
        last_edited_at: new Date(attrs.last_edited_at as Date),
        snippet: attrs.snippet as string || '',
      },
    };
  } catch {
    return null;
  }
}

interface ResumeTimelineEvent {
  title: string;
  period: string;
  role: string;
  tags: string;
  summary: string;
}

export type MdTimeline = MarkdownEssentials<ResumeTimelineEvent>;

export async function getTimelineEvent(
  slug: string,
): Promise<MdTimeline | null> {
  try {
    const { attrs, content } = await getMarkdown<ResumeTimelineEvent>(
      './data/docs/resume/timeline',
      slug,
    ) as MdTimeline;

    return {
      slug,
      content: content,
      attrs: {
        title: attrs.title as string | '',
        period: attrs.period as string | '',
        role: attrs.role as string | '',
        tags: attrs.tags as string | '',
        summary: attrs.summary as string | '',
      },
    };
  } catch {
    return null;
  }
}

export const getTimelineEvents = (): Promise<MdTimeline[]> =>
  getMarkdowns<ResumeTimelineEvent>(
    './data/docs/resume/timeline',
    getTimelineEvent,
    (a, b) => parseInt(b.slug) - parseInt(a.slug),
  );
