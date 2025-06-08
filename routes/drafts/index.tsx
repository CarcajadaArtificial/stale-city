import { define } from "utils";
import { walk } from "@std/fs";

export default define.page(async function () {
  const draftWalk = await Array.fromAsync(walk("./data/drafts"));
  const drafts = draftWalk.filter((walkEntry) => walkEntry.isFile);

  return (
    <main class="layout my-2-1">
      <div class="col-span-full prose">
        <span>
          ←{" "}
          <a tabindex={0} href="/" class="link inline-block mb-2-1">
            Return home
          </a>
        </span>
        <h1 tabIndex={0}>Drafts</h1>
        <ul>
          {drafts.map((draft, i) => (
            <li key={i}>
              <a href={`/drafts/${draft.name.split(".")[0]}`}>
                {draft.name.split(".")[0]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
});
