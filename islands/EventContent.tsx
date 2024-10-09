import { useState } from "preact/hooks";
import { MarkdownEssentials, MdTimelineEvent } from "@/src/utils.ts";
import Module from "lunchbox/components/Module/index.tsx";
import Markdown from "lunchbox/components/Markdown/index.tsx";
import Text from "lunchbox/components/Text/index.tsx";
import Link from "lunchbox/components/Link/index.tsx";

export default function (event: MarkdownEssentials<MdTimelineEvent>) {
  const [isOpen, setOpen] = useState(false);

  const { attrs, content } = event;

  return (
    <Module size="lg" half="xl">
      <div class={attrs.isPrimary ? "my-8" : "my-4"}>
        <Text type={attrs.isPrimary ? "heading" : "paragraph"} noMargins>
          {attrs.title}
        </Text>
        <Text type="small" noMargins>{attrs.role}</Text>
        {attrs.isPrimary
          ? (
            <>
              <Text noMargins>{attrs.summary}</Text>
              <Text>
                {Array.isArray(attrs.tags) ? attrs.tags.join(", ") : attrs.tags}
              </Text>
            </>
          )
          : null}
        <div class="mt-4">
          {isOpen
            ? <Markdown markdownContent={content} />
            : (
              <Text type="small" noMargins>
                <Link onClick={() => setOpen(true)}>See more...</Link>
              </Text>
            )}
        </div>
      </div>
    </Module>
  );
}
