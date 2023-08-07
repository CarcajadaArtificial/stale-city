import { MdPost } from '../src/data.ts';
import { Link, Text } from 'lunchbox';

interface iPostInfo {
  post: MdPost;
  display?: boolean;
}

export default function (props: iPostInfo) {
  const attrs = props.post.attrs;

  const date = attrs.published_at.toString() !== 'Invalid Date' &&
    new Date(attrs.published_at).toLocaleDateString('en-US', {
      dateStyle: 'long',
    });
  const edited = attrs.last_edited_at.toString() !== 'Invalid Date' &&
    new Date(attrs.last_edited_at).toLocaleDateString('en-US', {
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
        <Link href={`./blog/${props.post.slug}`}>{attrs.title}</Link>
      </Text>
      <Text>{attrs.snippet}</Text>
    </div>
  );
}
