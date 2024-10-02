import { MarkdownEssentials, MdTimelineEvent } from "@/src/utils.ts";
import Module from "lunchbox/components/Module/index.tsx";
import Markdown from "lunchbox/components/Markdown/index.tsx";
import Text from "lunchbox/components/Text/index.tsx";
import Code from "lunchbox/components/Code/index.tsx";

export default function (
  event: MarkdownEssentials<MdTimelineEvent>,
) {
  const { title, role, summary, tags, period } = event.attrs;
  const { slug, content } = event;

  return (
    <>
      <Module size="sm" half="lg">
        <Text>{title}</Text>
        <Text>{role}</Text>
        <Text>{summary}</Text>
        <Text>{Array.isArray(tags) ? tags.join(", ") : tags}</Text>
      </Module>
      <Module size="xs" half="xs">
        <Text>|</Text>
      </Module>
      <Module size="sm" half="xs">
        <Text>{period}</Text>
      </Module>
    </>
  );
}
