import Markdown from "components/Markdown.tsx";
import FollowitForm from "components/FollowitForm.tsx";

export default function (props: { footerContent: string }) {
  return (
    <footer class="layout mt-3-1">
      <div class="col-span-6 lg:col-span-8">
        <Markdown className="no-margins mt-2" content={props.footerContent} />
        <FollowitForm />
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
  <div class="col-span-3 md:col-span-2 lg:col-span-4 flex flex-col gap-1-8">
    <Markdown className="mb-1-2" content="#### Socials" />
    <a
      class="link block"
      tabindex={0}
      href="https://app.follow.is/share/feeds/137022670373136384"
    >
      Folo
    </a>
    <a
      class="link block"
      tabindex={0}
      href="https://github.com/CarcajadaArtificial"
    >
      GitHub
    </a>
    <a
      class="link block"
      tabindex={0}
      href="https://follow.it/stale-city?pub"
    >
      follow.it
    </a>
    <a
      class="link block"
      tabindex={0}
      href="https://techhub.social/@carcajada"
    >
      Mastodon
    </a>
    <a
      class="link block"
      tabindex={0}
      href="mailto:blog@stalecity.net"
    >
      blog@stalecity.net
    </a>
  </div>
);

const SiteLinks = () => (
  <div class="col-span-3 md:col-span-2 lg:col-span-4 lg:order-last flex flex-col gap-1-8">
    <Markdown className="mb-1-2" content="#### On this site" />
    <a class="link block" tabindex={0} href="/rss.xml">RSS</a>
    <a class="link block" tabindex={0} href="/drafts">Drafts</a>
    <a class="link block" tabindex={0} href="/gallery">
      Gallery
    </a>
    <a class="link block" tabindex={0} href="/license">
      License
    </a>
    <a class="link block" tabindex={0} href="/posts">
      All posts
    </a>
    <a class="link block" tabindex={0} href="/changelog">
      Changelog
    </a>
  </div>
);
