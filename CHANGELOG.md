# Changelog

## Roadmap

- [ ] Home
  - [x] Links to other pages.
  - [ ] Display my main creations.
  - [ ] Something cool.

- [ ] Blog Feed
  - [x] Home view for all the posts.
  - [x] Add a view of markdown files inside `data/`.
  - [x] Add a generator for a static `rss.xml` for the feed schema.
  - [x] Add a RSS link where the blog is referenced.
  - [ ] Add a search bar for finding posts. (`Algolia`?)

- [ ] Resume
  - [x] Add a downloadable pdf resume.
  - [ ] Add a timeline with the events of my life. Include a cool fade in
        animation for timeline events.

## History

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
