import Markdown from "components/Markdown.tsx";

export default function (props: { footerContent: string }) {
  return (
    <footer class="layout mt-3-1">
      <div class="col-span-6 lg:col-span-8">
        <Markdown className="no-margins mt-2" content={props.footerContent} />
      </div>
      <Socials />
      <SiteLinks />
      <div class="col-span-6 lg:col-span-8 prose">
        <img
          tabIndex={0}
          class="mix-blend-multiply dark:invert dark:mix-blend-difference"
          src="/assets/stale_city.png"
        />
      </div>
    </footer>
  );
}

const Socials = () => (
  <div class="col-span-3 md:col-span-2 lg:col-span-4">
    <Markdown content="#### Socials" />
    <ul class="list-none p-0 mt-3 mb-0">
      <li>
        <a
          class="link inline-block"
          tabindex={0}
          href="https://app.follow.is/share/feeds/137022670373136384"
        >
          Folo
        </a>
      </li>
      <li>
        <a
          class="link inline-block"
          tabindex={0}
          href="https://github.com/CarcajadaArtificial"
        >
          GitHub
        </a>
      </li>
      <li>
        <a
          class="link inline-block"
          tabindex={0}
          href="https://techhub.social/@carcajada"
        >
          Mastodon
        </a>
      </li>
      <li>
        <a
          class="link inline-block"
          tabindex={0}
          href="mailto:blog@stalecity.net"
        >
          blog@stalecity.net
        </a>
      </li>
    </ul>
  </div>
);

const SiteLinks = () => (
  <div class="col-span-3 md:col-span-2 lg:col-span-4 lg:order-last">
    <Markdown content="#### On this site" />
    <ul class="list-none p-0 mt-3 mb-0">
      <li>
        <a class="link inline-block" tabindex={0} href="/rss.xml">RSS</a>
      </li>
      <li>
        <a class="link inline-block" tabindex={0} href="/license">
          License
        </a>
      </li>
      <li>
        <a class="link inline-block" tabindex={0} href="/archive">
          All posts
        </a>
      </li>
      <li>
        <a class="link inline-block" tabindex={0} href="/changelog">
          Changelog
        </a>
      </li>
    </ul>
  </div>
);
