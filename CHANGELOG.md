# Changelog

## Roadmap

- [ ] Home
  - [x] Links to other pages.
  - [ ] Display my main creations.
  - [ ] Something cool.

- [ ] Blog Feed
  - [x] Home view for all the posts.
  - [ ] Add a view of markdown files inside `data/`.
  - [ ] Add a generator for a static `rss.xml` for the feed schema.
  - [ ] Add a RSS link where the blog is referenced.
  - [ ] Add a search bar for finding posts. (`Algolia`?)

- [ ] Resume
  - [ ] Add a downloadable pdf resume.
  - [ ] Add a timeline with the events of my life.

## History

### v0.0.33

- Added standard naming for posts.
- Added a view page for the list of all posts. `routes/posts/index.tsx`
- Added updated external module references `deno.json`, `dev.ts`
- Added a utility function module. `src/utils.ts`
- Added minor updates `routes/index.tsx`

### v0.0.32

- Added a header to the home page. It contains a hello message and an image. `routes/index.tsx`.
- Added lunchbox implementation `routes/_app.tsx`, `fresh.config.ts`, `deno.json`.
- Added the `Footer` component containing the site's version.
- Removed the `TimelineEvent` island.

### v0.0.31

- Reset old site into the new Lunchbox and Deno Fresh version.

### v0.0.30

- Updated CV.