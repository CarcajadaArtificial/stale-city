# Changelog

## Working On

- Add a route that exposes the project's CHANGELOG and LICENSE.

### Next up

- Add a component that automatically creates a table of contents based on the
  markdown content.
- Add basic post search. (npm:minisearch)
- Add Sentry and Bucket.

## Version History

### v0.0.59

- Added sorting by date to the rss feed.

### v0.0.58

- Fixed the rss feed.

### v0.0.57

- Added the `rss-generator` library to make valid rss xml.

### v0.0.56

- Fixed the XML feed validator issue.
- Added the new custom stylesheet.

### v0.0.55

- Hotfix

### v0.0.54

- Migrated my old posts to this site.

### v0.0.53

- Added the post `wrapper-is-product`.
- Added the `reading-time` functionality

### v0.0.52

- Added quotes and references to the `ai-isnt-hard` post.

### v0.0.51

- Updated the `ai-isnt-hard` post.

### v0.0.50

- Added favicons.

### v0.0.49

- Added comments to posts.

### v0.0.48

- Updated the post directory structure form `./data/posts/[[POST_ID]].md` to
  `./data/posts/[[POST_SLUG]]/post.md`.

### v0.0.47

- Added the `ai-isnt-hard` draft.

### v0.0.46

- Added an english language setting to the html document.

### v0.0.45

- Added a social links fix.

### v0.0.44

- Updated lock file

### v0.0.43

- Addded a restoration of the blog functionality.

### v0.0.42

- Added the updated Lunchbox UI components.

### v0.0.41

- Added updated text to timeline's `1.md`, `2.md`, and `3.md`.

### v0.0.40

- Added minor fixes to the resume page `islands/EventContent.tsx`,
  `islands/TimelineEvent.tsx`, `routes/resume.tsx`
- Added updated text to timeline's `1.md` and `2.md`.

### v0.0.39

- Added the `EventContent` island that reveals the timeline event's content on
  click.
- Reordered the `2.md` and `4.md` blog posts.

### v0.0.38

- Added an updated resume view. `routes/resume.tsx`, `islands/TimelineEvent.tsx`
- Added a short period of only the year on the timeline markdowns.

### v0.0.37

- Added the attribute `isPrimary` to the timeline event .md's.
  `data/docs/resume/timeline/*`, `src/utils.ts`.
- Added updated styles to the TimelineEvent island.

### v0.0.36

- Updated the timeline event .md's. `data/docs/resume/timeline/*`
- Added the `/resume` route.
- Added the TimelineEvent island.
- Added obsidian to the gitignore file.

### v0.0.35

- Added RSS feed generator. `routes/rss.xml.ts`, `deno.json`,
- Added minor fixes. `main.ts`
- Added links to the footer component. `components/Footer.tsx`,
  `routes/posts/[postId].tsx`, `routes/posts/index.tsx`

### v0.0.34

- Added a view that displays a single markdown file as a post.
  `routes/posts/[postId].tsx`.
- Added minor fixes. `data/posts/1.md`, `data/posts/2.md`, `data/posts/3.md`,
  `data/posts/4.md`

### v0.0.33

- Added standard naming for posts.
- Added a view page for the list of all posts. `routes/posts/index.tsx`
- Added updated external module references `deno.json`, `dev.ts`
- Added a utility function module. `src/utils.ts`
- Added minor updates `routes/index.tsx`

### v0.0.32

- Added a header to the home page. It contains a hello message and an image.
  `routes/index.tsx`.
- Added lunchbox implementation `routes/_app.tsx`, `fresh.config.ts`,
  `deno.json`.
- Added the `Footer` component containing the site's version.
- Removed the `TimelineEvent` island.

### v0.0.31

- Reset old site into the new Lunchbox and Deno Fresh version.

### v0.0.30

- Updated CV.
