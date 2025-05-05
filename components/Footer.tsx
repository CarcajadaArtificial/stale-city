import Markdown from "components/Markdown.tsx";
import Gradient from "components/Gradient.tsx";

export default function (props: { footerContent: string }) {
  return (
    <Gradient inverted>
      <footer class="py-8 grid">
        <div class="card col-md">
          <h4>About</h4>
          <Markdown className="no-margins mt-2" content={props.footerContent} />
        </div>
        <div class="card col-sm">
          <h4>Socials</h4>
          <ul class="list-none p-0 mt-3 mb-0">
            <li>
              📡 <a href="rss.xml">RSS</a>
            </li>
            <li>
              🐙 <a href="https://github.com/CarcajadaArtificial">GitHub</a>
            </li>
            <li>
              🐘 <a href="https://techhub.social/@carcajada">Mastodon</a>
            </li>
            <li>
              🗞️{" "}
              <a href="https://app.follow.is/share/feeds/137022670373136384">
                Folo
              </a>
            </li>
            <li>
              📫{" "}
              <a href="mailto:blog@stalecity.net">
                blog@stalecity.net
              </a>
            </li>
          </ul>
        </div>
        <div class="card col-sm">
        </div>
      </footer>
    </Gradient>
  );
}
