---
title: On Notes
published_at: Jul 26, 2023
snippet:
  My thoughts on note-taking application, their general philosophy, and what it
  lacks.
---

## Introduction

> Hello? God? It's me. I had that dream again, I cannot seem to take this idea
> out of my head. You know, it's been bugging me for a long time now. I believe
> I have the power to make it, I'm just unsure of my skills and decisions.
> Please help me find confidence in my tools so I can finally do it. Please,
> help me find the way. Amen.

_— Me, praying._

It's not an exaggeration, I've been dreaming of this thing for years now. I was
afraid that when making it I would suddenly hate the foundations with what it
was made. But the more I thought about it I came to realize that there was only
one thing I wanted to control, to build from scratch. It was a UI component
library, things like Material UI or Bootstrap were the ones that made me
nervous.

Now, let's talk about hypothetical situations. Usually, when one thinks about
going back in time, to talk to oneself; one would give a piece of bold advice:
"Start now", "Make mistakes faster", "Don't wait", or something like that. So
far, I wouldn't do that. Even though I see the great value in leanness, that
early mistakes cost less than late mistakes, or that learning now is better than
learning later. But at that time, starting early would've been costly. I'm
thankful that at that time I knew exactly what I wanted and slowly sculpted it.
"What is this dream, then? Too much talk, man." I know, I know, I'm sorry.

## Influences

What is the base of every app for taking notes? A text editor that makes
documents. That's it. That's what Google Docs has in common with Notion,
Obsidian, Notepad, TextEdit, MS Word, etc. It's a tool that creates and edits
text in a document. This is where I differ philosophically, I don't want to
store, edit, and organize documents. I want to do it with individual ideas. No
documents, only ideas.

This removes the distraction of text styles like bold or italic text, headings,
spacing, line heights, font sizes, tables of contents, folders, pages, covers,
etc. Just write the damn idea and let it be.

My inspirations are really clear and direct, the Bullet Journal and the
Zettelkasten method of note-taking. My ideal tool functions just as a Bullet
Journal, it follows its natural steps into the digital realm.

### Bullet Journal

- Notes can be identified by their left marker.
- One idea in one bullet, not writing paragraphs of prose keeps information
  concise.
- You can keep track of the same things as in a bullet journal. (Tasks, events,
  notes, etc)
- Daily, monthly, and yearly views provide different levels of relevant
  information.
- A migration process for unresolved tasks and unconnected notes.

### Zettelkasten Method

- Notes can be marked by a reference, typically this is a place outside the
  notes app, like a URL, date, book, chapter, page, article, video, movie, etc.
  These are typically called "Literature" notes, but this system expands this
  meaning to anything out of the notes app.
- Notes can be promoted to "permanent". This gives them a higher hierarchical
  status than others.
- Having notes expressed as questions is extremely useful for connecting them
  with others.
- It must be trivially easy to find the exact note that is needed.
- Fleeting notes should be easily reviewed later.

## Features

It is a pain to attempt to follow these ideas in any app. The text editing comes
in the way of quickly writing a note. The document system hinders connecting
notes among themselves. And there is no quick way of querying notes in
meaningful ways. Taking advantage of the fact that I'm already tailor-making an
app for myself, why shouldn't I add my deepest opinions on it?

### App features

- It will be self-hosted. Frankly, I don't want anything to do with your data.
  This app is going to be made so a users can easily set it up on the server of
  their liking.
- Free and open-source. I will never charge for this, this is a gift for myself
  and the world.
- The information stored on your notes should be easily downloaded and accessed
  if you decide to quit the app.

## Tradeoffs from document-style note-taking

My rejection of document-based note-taking was left clear in part one. This note
scheme has been part of my life since forever. It would be unrealistic on my
part to assume a smooth transition from one mode to another. Now that I’m on the
verge of releasing version 0.1.0, what do I predict to miss from taking notes in
documents?

### Arbitrary font styles

There will be an urge to customize the style of just a single note or word. Say,
changing it’s color, size, weight, emphasis, etc. This is definitely out of
scope for the first major version.

To move around the notes (say, with a drag and drop system) to change their
order or to add titles that divide arbitrary sections from each other. This is
an extremely low-priority feature that may be included in the first major
version of the app. The proposed design works with saved search queries that
have their own page. This page might be customizable enough for these use cases.

Styles that are not arbitrarily set, like the color theme and font family, will
be configurable as a feature soon enough. It must be developed after the
configuration page.

### Print to paper

This is an interesting idea that I personally like a lot. I totally see myself
wanting to print the results of a search query or a particular page. This is a
feature that I’m enthusiastic to develop because it is solved using CSS. I doubt
that colored printing will be available from the start because I really don’t
care about it. Printing on paper is a low priority but is likely to come in the
first major version or on a close minor update after it.

### Adding images or other content

This has been a big no-no for me since the beginning. Using a third-party media
host service is out of the question and I consider implementing a self-hosted
solution a gimmick feature. The mid-term solution is that the user hosts their
content somewhere else that can share media through URLs (like Google Drive,
Dropbox, etc.) and add it as an Entry Mark.

This will automatically tag the entry as a “link” and become an interactive
anchor. Something mid-priority is regarding link previews, this will be
implemented in the first major version but may be limited to certain services
like YouTube at the beginning.

### Sharing and collaboration

Simultaneous collaboration is out of scope from the first major versions because
multiple-user authentication is as well. Link sharing is fairly likely using
search query pages. The user will be able to mark search queries as public, this
means that that particular page will not require login to access, and therefore
the URL can be publicly shared. As a note, this feature requires good metadata
usage for social media post previews.

## Next updates

That is enough talk about the things that are out of scope, low priority, or far
from being released. Now I would like to talk about the things that I’m excited
to develop and release soon.

### Full mobile support and smooth interactivity

I was so excited about the desktop keyboard-focused interactivity that
completely ignored mobile interactions and functionalities. To remedy this, I’ll
develop a mobile-only low-key menu that will be on top of the keyboard or at the
bottom of the page. The actions in this menu can help a user navigate the entry
input and entry query islands. Additionally, the user could interact with notes
using the same menu.

This also deserves a light side quest to fix a series of issues with
[Lunchbox](https://github.com/CarcajadaArtificial/lunchbox) and
[GarliCSS](https://github.com/CarcajadaArtificial/garlicss). This will include
updates in components and responsiveness fixes. After these few urgent updates,
mobile should now be fully featured.

### Tag Pages

There must be a page that manages tags. Here, there are a few features that can
be useful: merging one tag to another, changing the name of a tag, and
visualizing the data of every tag. Really, merging tags is simply renaming a tag
to an existing one's name. All of these tools will be inside
`routes/tag/index.tsx`.

Additionally, tags will also have individual pages of their own in
`/routes/tag/[tag].tsx`. This page will contain a predetermined layout that aids
in easily navigating the entries with that tag. In the Entry Query and Entry
Input islands, there's a need for a better tag selection. There's a need for
autocomplete or some way of finding the correct tag to use.

### Threads

It is useful to group entries in threads, there must be a way to create threaded
notes. This would be really useful for grouping notes together and giving them a
common source. When creating a new entry, a checkbox could offer the required
interaction. When checked, the next entries would form a thread one connected to
the other. Entries might have different tags or marks. There must also be a way
to add a new entry to a thread or to connect an existing one using its id or
something.

Notes can only be inside one thread. Adding a new entry to a thread will always
add it to the end of the thread. Removing an entry from a thread must not affect
the rest.

### Time views

This will be amazing to navigate different time periods. To make it work the
following route structure must be implemented:
`/routes/archive/[year]/[month]/[day]` and `/routes/archive.tsx` will be moved
to `/routes/archive/index.tsx`. This allows to query every single date with a
predefined layout in each.

The yearly view will focus on permanent notes and on the popularity of every
tag. The monthly view will focus on tasks and events that happened that month.
Finally, the daily view will display all entries of that day in an organized
way.

## Final thoughts

This is my dream note-taking app in a nutshell, and now, the future looks
bright, right? Yes. Right. I'm super pumped for these features. I love to just
dump my mind in posts like these. I feel like the path forward is somewhat
blurry but visible, and that must be something good. Thank you for reading.
