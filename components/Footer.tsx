import Markdown from "components/Markdown.tsx";

export default function (props: { footerContent: string }) {
  return (
    <footer class="layout my-3-1">
      <div class="col-span-4 lg:col-span-8">
        <Markdown className="no-margins mt-2" content={props.footerContent} />
      </div>
      <div class="col-span-2 lg:col-span-4 flex flex-col md:flex-row lg:justify-between">
        <div>
          <h4 class="inline-block" tabindex={0}>On this site</h4>
          <ul class="list-none p-0 mt-3 mb-0">
            <li>
              📡{" "}
              <a class="link inline-block" tabindex={0} href="/rss.xml">RSS</a>
            </li>
            <li>
              🗄️{" "}
              <a class="link inline-block" tabindex={0} href="/archive">
                All posts
              </a>
            </li>
          </ul>
        </div>
        <div class="text-right">
          <h4 class="inline-block" tabindex={0}>Socials</h4>
          <ul class="list-none p-0 mt-3 mb-0">
            <li>
              <a
                class="link inline-block"
                tabindex={0}
                href="https://app.follow.is/share/feeds/137022670373136384"
              >
                Folo
              </a>{" "}
              🗞️
            </li>
            <li>
              <a
                class="link inline-block"
                tabindex={0}
                href="https://github.com/CarcajadaArtificial"
              >
                GitHub
              </a>{" "}
              🐙
            </li>
            <li>
              <a
                class="link inline-block"
                tabindex={0}
                href="https://techhub.social/@carcajada"
              >
                Mastodon
              </a>{" "}
              🐘
            </li>
            <li>
              <a
                class="link inline-block"
                tabindex={0}
                href="mailto:blog@stalecity.net"
              >
                blog@stalecity.net
              </a>{" "}
              📫
            </li>
          </ul>
        </div>
      </div>
      <div class="card col-sm">
      </div>
    </footer>
  );
}
