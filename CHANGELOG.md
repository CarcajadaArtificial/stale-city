# Changelog

## Working On

- Add favicons.

## Version History

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

- Added minor fixes to the resume page `islands/EventContent.tsx`, `islands/TimelineEvent.tsx`, `routes/resume.tsx`
- Added updated text to timeline's `1.md` and `2.md`.

### v0.0.39

- Added the `EventContent` island that reveals the timeline event's content on click.
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
