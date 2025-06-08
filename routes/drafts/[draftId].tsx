import { define } from "utils";
import Markdown from "components/Markdown.tsx";
import { exists } from "@std/fs";

export default define.page(async function (props) {
  const path = `./data/drafts/${props.params.draftId!}.md`;

  if (!exists(path)) {
    return new Response(null, { status: 404 });
  }

  return (
    <main class="layout my-2-1">
      <div class="col-span-full prose">
        <span>
          ←{" "}
          <a tabindex={0} href="/" class="link inline-block mb-2-1">
            Return home
          </a>
        </span>
        <Markdown content={await Deno.readTextFile(path)} />
      </div>
    </main>
  );
});
