interface PostActionsProps {
  postFileName: string;
  postTitle: string;
  postUrl: string;
}

export default function PostActions(props: PostActionsProps) {
  const { postFileName, postTitle, postUrl } = props;

  const githubEditUrl = `https://github.com/CarcajadaArtificial/stale-city/blob/main/data/posts/${postFileName}/post.md`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(postUrl)}`;
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(postTitle)}`;

  return (
    <div class="card-bg mt-4"> {/* Added mt-4 for spacing, can be adjusted */}
      <div class="card">
        <ul class="list-none p-0 m-0">
          <li class="mb-2">
            <a href={githubEditUrl} target="_blank" rel="noopener noreferrer">
              See this page's edit history
            </a>
          </li>
          <li class="mb-2">
            <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer">
              Share on Twitter
            </a>
          </li>
          <li>
            <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer">
              Share on LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
