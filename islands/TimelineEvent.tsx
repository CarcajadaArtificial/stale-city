import { useState } from 'preact/hooks';
import { Link, Markdown, Text } from 'lunchbox';
import { MdTimeline } from '../src/data.ts';

interface iTimelineEvent {
  md: MdTimeline;
}

export default function TimelineEvent(props: iTimelineEvent) {
  const { attrs, content } = props.md;
  const major = attrs.summary !== '';

  const [descriptionOpen, setDescriptionOpen] = useState<boolean>(false);

  return (
    <div class='isl-timelineEvent'>
      <div
        class={`isl-timelineEvent_indicator${
          major ? ' isl-timelineEvent_major' : ''
        }`}
      />
      <div class='isl-timelineEvent_content'>
        <Text noMargins type='small'>{attrs.period}</Text>
        <Text noMargins type={major ? 'heading' : 'paragraph'}>
          {attrs.title}
        </Text>
        {major
          ? (
            <>
              <Text noMargins type='subheading'>{attrs.role}</Text>
              <Text>{attrs.summary}</Text>
            </>
          )
          : null}
        {descriptionOpen
          ? <Markdown class='mt-6' markdown_content={content} />
          : (
            <Link onClick={() => setDescriptionOpen(true)}>
              Read more
            </Link>
          )}
      </div>
    </div>
  );
}
