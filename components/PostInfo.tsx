import { Post } from '../src/data.ts';
import { Link, Text } from 'lunchbox';

interface iPostInfo {
  post: Post;
  display?: boolean;
}

export default function (props: iPostInfo) {
  const date = props.post.published_at.toString() !== 'Invalid Date' &&
    new Date(props.post.published_at).toLocaleDateString('en-US', {
      dateStyle: 'long',
    });
  const edited = props.post.last_edited_at.toString() !== 'Invalid Date' &&
    new Date(props.post.last_edited_at).toLocaleDateString('en-US', {
      dateStyle: 'long',
    });

  return (
    <div>
      <Text noMargins type='small'>
        <>
          {date}
        </>
        {date !== edited
          ? (
            <>
              {`, edited on: ${edited}`}
            </>
          )
          : null}
      </Text>
      <Text
        noMargins={!props.display}
        type={props.display ? 'display' : 'subheading'}
      >
        <Link href={`./blog/${props.post.slug}`}>{props.post.title}</Link>
      </Text>
      <Text>{props.post.snippet}</Text>
    </div>
  );
}
