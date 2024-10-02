import { MarkdownEssentials, MdTimelineEvent } from "@/src/utils.ts";
import Module from "lunchbox/components/Module/index.tsx";
import Markdown from "lunchbox/components/Markdown/index.tsx";
import Text from "lunchbox/components/Text/index.tsx";
import Code from "lunchbox/components/Code/index.tsx";

const ModuleContent = (event: MdTimelineEvent) => (
  <Module size="sm" half="lg">
    <div class="mt-8 mb-16">
      <Text type={event.isPrimary ? "heading" : "subheading"} noMargins>
        {event.title}
      </Text>
      <Text type="small" noMargins>{event.role}</Text>
      <Text noMargins>{event.summary}</Text>
      <Text>
        {Array.isArray(event.tags) ? event.tags.join(", ") : event.tags}
      </Text>
    </div>
  </Module>
);

const ModulePeriod = (event: MdTimelineEvent) => (
  <Module size="sm" half="xs">
    <div class={event.isPrimary ? "mt-8" : "mt-12"}>
      <Text class={event.isPrimary ? "text-left" : "text-right"}>
        {event.period}
      </Text>
    </div>
  </Module>
);

const ModuleLine = (event: MdTimelineEvent) => (
  <Module size="xs" half="xs" class="relative">
    <div class="h-full w-1/2 border-r border-r-1" />
    <div
      class="absolute top-8 w-12 h-12 rounded-full"
      style={{
        backgroundColor: "var(--clr-txt-base)",
        left: "calc(50% - 1.5rem)",
      }}
    />
  </Module>
);

export default function (
  event: MarkdownEssentials<MdTimelineEvent>,
) {
  return (
    <>
      {event.attrs.isPrimary
        ? <ModuleContent {...event.attrs} />
        : <ModulePeriod {...event.attrs} />}
      <ModuleLine {...event.attrs} />
      {event.attrs.isPrimary
        ? <ModulePeriod {...event.attrs} />
        : <ModuleContent {...event.attrs} />}
    </>
  );
}
