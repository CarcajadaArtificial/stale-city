import { define } from "utils";
import Markdown from "components/Markdown.tsx";

export default define.page(async function Home() {
  return (
    <main class="layout my-2-1">
      <div class="col-span-full prose">
        <span>
          ←{" "}
          <a tabindex={0} href="/" class="link inline-block mb-2-1">
            Return home
          </a>
        </span>
        <h1 tabIndex={0}>License</h1>
        <Markdown content={await Deno.readTextFile("./LICENSE")} />
      </div>
    </main>
  );
});
