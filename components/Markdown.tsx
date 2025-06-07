import type { JSX } from "preact";
import { md } from "@lunchbox/ui";
import { cn } from "@vyn/cn";
import { DOMParser, Element } from "jsr:@b-fuze/deno-dom";

export default function (p: {
  content: string;
  className?: string;
  removeChildAfter?: number;
}): JSX.Element {
  return (
    <div
      class={cn("prose", p.className ?? "")}
      {...md({
        content: p.content,
        transform: (content: string) => {
          const doc = new DOMParser().parseFromString(content, "text/html");
          const body = doc.body;
          Array.from(body.children).forEach((el, i) => {
            if (!(el instanceof Element)) return;
            else if (p.removeChildAfter && i > p.removeChildAfter) {
              body.removeChild(el);
            } else if (
              el.tagName.toLowerCase() === "details" &&
              el.querySelector("summary") instanceof Element
            ) {
              el.querySelector("summary")!.setAttribute("tabindex", "0");
            } else {
              el.setAttribute("tabindex", "0");
            }
          });
          return body.innerHTML;
        },
      })}
    />
  );
}
