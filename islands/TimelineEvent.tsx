import { MarkdownEssentials, MdTimelineEvent } from "@/src/utils.ts";
import Module from "lunchbox/components/Module/index.tsx";
import Text from "lunchbox/components/Text/index.tsx";
import EventContent from "@/islands/EventContent.tsx";

const ModulePeriod = (event: MdTimelineEvent) => (
  <Module size="xs" half="xs">
    <div class={event.isPrimary ? "mt-9" : "mt-5"}>
      <Text class="text-right" noMargins>
        {event.period}
      </Text>
    </div>
  </Module>
);

const ModuleLine = (event: MdTimelineEvent) => (
  <Module size="xs" half="xs" class="relative">
    <div class="h-full w-1/2 border-r border-r-1" />
    {event.isPrimary
      ? (
        <div
          class="p-2 border absolute top-8 rounded-full"
          style={{ left: "calc(50% - 1.5rem)" }}
        >
          <div
            class="w-8 h-8 rounded-full"
            style={{
              backgroundColor: "var(--clr-txt-base)",
            }}
          />
        </div>
      )
      : (
        <div
          class="absolute top-6 w-4 h-4 rounded-full"
          style={{
            backgroundColor: "var(--clr-txt-base)",
            left: "calc(50% - 0.5rem)",
          }}
        />
      )}
  </Module>
);

export default function (
  event: MarkdownEssentials<MdTimelineEvent>,
) {
  return (
    <>
      <ModulePeriod {...event.attrs} />
      <ModuleLine {...event.attrs} />
      <EventContent {...event} />
      <Module size="xs" />
    </>
  );
}
