---
stage: Drafting
---

# The story behind Lunchbox

Have you every seen the European guy that spent a few years around 2016 building
a new musical instrument from scratch? His artist name is Wintergatan, and he
would wind it up after feeding it thousands of metal marbles, each with a clear
travel across the inner pathways of the machine, ending with a collapse with a
sound-making material. He called it the "Marble Machine". It represents one side
of the duality of how I feel about this project.

It was an interesting project to se him build, and even his most recent
development of a new version "Marble Machine 3" is cool enough. Sometimes a
piece of the machine would break and would need to be replaced with a new one
exactly alike, but more frequently than that he would find them to be
insufficient. A part could perform deceivingly good only to fail under harsher
circumstances requiring a slight redesign of that part. It was something that
made it worthwhile to watch his progress videos, he was constantly fixing
things, solving problems, making mistakes, redesigning, etc.

I've recently felt that this project and I have a similar dynamic. It has taught
me so much about about the pure technologies that make up the web to the
frameworks that create abstractions of them. But, if this Marble Machine with an
infinite backlog of redesigning parts is one side of the spectrum, what is the
other side?

Do you remember the early Malcolm in the Middle? There's an episode where Hal
(Malcolm's dad) has a midlife work crisis after being questioned by kids in his
son's school about his boring job, he takes a leave of absence from work by
lying about a kidney problem, and dedicates the following weeks to create a
mysterious painting inside the family garage. The whole episode revolves around
the concept of employment. There is Hal's crisis as the main plot, Lois forces
Francis to do unfulfilling work at the Lucky Aid market, and Malcolm struggles
to take a decision on what he would like his future career to be.

Now, Hal's subplot is incredibly relatable to me, as soon as he stopped working
on his 9-to-5 he stopped being miserable as well. Breakfast tasted like never
before, his children went to him with questions and he gave them satisfactory
advice, his relationship with Lois gets more passionate, and he looks and feels
happier. Hal is shown constantly layering paint on top of paint (exclusively
basic colors by the way).

But this isn't TV from the 80's, he quickly began spending the family's savings
to buy canned paint and starts to live a negative arc where he slowly becomes
miserable again. He grows bitter of not being able of recreate the painting
inside his mind.

At the end of the episode, at the peak of his despair, Hal screams the same
complaint he made when he worked in his 9-5, as if the misery would come out of
any full time daily activity regardless of the level of passion, artistry or
significance of the work done. The rest of the family tries to comfort Hal when
he gets a sudden _eureka moment_ and _understands_ exactly wat's missing from
the painting. The family watches in awe as he paints, until reaching the end
when he comically paints a single quick point with the brush. They instantly
_got it_, everyone admired the painting in their own individual way. At the
hight of the episode, when the family gets together and everything is good, the
painting comes down falling on top of Hal after showing us the sheer girth after
countless of layer of paint placed on top of each other.

## Pre v1.0

When did I decide I wanted to build a component library? Well, everything
started when I wanted to reinvent the wheel (React.js). You've probably heard
about developers trying their luck with a "new JavaScript front-end framework".
Cut me some slack, you'd hear that only millions of times back then. I'll not go
into details about it right now, but with hindsight knowledge, that project's
goal is a JSX alternative. Because XML/HTML-like code deeply sucks because it's
as unreadable as code gets.

From there, a design system started to protude. At the beginning I called it
"Juicebox" and it was a mere color palette. I would name them based on juice
flavor, but it was an awkward naming system so I ended up dropping it along with
the name.

At this time, my current obsession was vanilla JavaScript. I seriously believed
that it was the best way to create and manage interfaces. Libraries that altered
the syntax too much were considered forbidden. Then I found out about Deno and I
chose it over Node with Vite (which I still consider to be the best way to
develop web applications in Node). Then, betraying my previously imposed ideals,
I was pulled to the dreadful `.tsx` when the Fresh framework came out. Their
philosophy for SSR and web standardization rang with me.

## v1.0

It started to play around with pre-released versions of Deno and Fresh, and felt
that in these technologies I could thrive. I feel like the usage of this
technology has a popularity-niche balance that I like, and I'm lucky enough to
be an early adopter of it. That's the perfect opportunity to make a name for
myself in a relatively small community. Then I thought about reviving Juicebox
but with a new goal and name. It was going to be a new component library.

The main disagreements I have with the component libraries at that time, was
their grid system and their responsiveness breakpoints. I also hated how they
always ran some type of non-standard client-side function for random components
to work. I preferred using native HTML features with components built with
best-practices in mind so you could simply not worry about it.

This is a rundown of how this stage of the project worked. It all starts with
the types `iComponent` and `iElement`. Both of these would help with extending a
component's arguments to include the ones of a HTMLElement that would work as
the main element of the component. For example, the `<Input/>` component's
properties would be of type `iComponent<HTMLInputElement>`. This type would give
Partial attributes, aria mixins, and event listeners for type safety components.

```tsx
// components/Input/index.tsx

function Input(props: iComponent<HTMLInputElement>) {
	return <input ...props />
}
```

A component would have three distinct parts, all of them in their own file. The
`index.tsx` file would contain all the rendering logic. As a strict practice,
this file would contain almost only JSX file, in order to isolate it so that
rarely would it need to be read or debugged. The `styles.scss` which then became
`styles.ts` after I replaced SCSS for a CSS-in-JS library in deno.land called
Resin; this file would obviously contain the component styles. Finally
`setup.ts` file would make sure consistent properties are always passed to the
component.

The setup function would also be composed of three distinct parts. First it was
the component's property object interface. It would extend the `iComponent` type
and include component-level properties. For example a `label` property for the
`<Input/>` component. This string value should render a `<label/>` element with
the best practices in mind. Then it would have a render function where you could
process and transform the property values of the component and return the final
version of them. For example, you could capitalize the Input label before
rendering it.

```ts
// components/Input/setup.ts

export type iInput = iComponent<HTMLInputElement> & {
  label: string;
};

export function setup(props: Partial<iInput>): iInput {
  props.label = capitalize(props.label);
  return props;
}
```

But wait didn't you say there were three distinct parts to a component's setup?
I sure did, the remaining part solves an issue present in the previous
codeblock. The problem is that I cannot render an `<Input/>` component without a
label. What's the solution, to make the properties Partial (`Partial<iInput>`)?
I don't think so, because then every property value could be undefined and it's
a hassle to manage all the undefined values all the time. The ideal scenario is
to have the properties be partial when calling the render function but not be so
during the setup.

My solution was to create an object with the default values of all of the
component properties. That way the input could always be Partial while letting
me have a controlled flow of values. I made a utility function called
`applyDefaults()`. The implementation of it is so simple I can showcase it next.

```ts
// src/utils.ts

export function applyDefaults<T>(d: T, i: Partial<T>): T {
  return { ...d, ...i };
}
```

```ts
// components/Input/setup.ts

export type iInput = iComponent<HTMLInputElement> & {
  label: string;
};

const defaults: iInput = {
  label: "Default label",
};

export function setup(props: Partial<iInput>): iInput {
  const p = applyDefaults(defaults, props);
  p.label = capitalize(p.label);
  return p;
}
```

```tsx
// components/Input/index.tsx

function Input(props: iComponent<HTMLInputElement>) {
	const p = setup()
	return <input ...props />
}
```

This is just a simple example of how the component implementation philosophy
worked in this stage of the project. At this point there was pure HTML and CSS
being render using Preact's element creator functions. Finally, without entering
into much detail, `styles.ts` had a simple implementation; nevertheless, there's
a hidden feature that I'd like to expose.

At this time I was a deep follower of the Atomic Design framework. I would then
adapt this idea to the design patterns of my components. An "Atom" would have
the intrinsic characteristic of being a component made up of _only_ one HTML
element. For example, the `<Button/>` atom was made out of exclusively a single
`<button/>` element with custom properties, styles, and default attribute values
that made it follow good practices. Molecules were components made out of
multiple HTML Elements and/or other atoms. The fictitious `<Input/>` component
I've been using as an example would be a Molecule component.

```ts
// components/Input/styles.ts

const inputStyles = {
  input: css`...`,
  label: css`...`,
};
```

```tsx
// components/Input/index.tsx

function Input(props: Partial<iInput>) {
	const { label, ...p} = setup(d, props);
	return (
		<label class={cn("input_label", styles.label)}>
			{label}
			<input class={cn("input", styles.input)} ...p />
		</label>
	)
}
```

And that's how the first major version of Lunchbox was created. Unfortunately
there was something I completely missed when testing; the CSS-in-JS library
worked in the client, not the server. People with "no script" settings or
browsers would see a website without any styles at all. And how did I find out?
Months later thanks to a snarking comment from a Redditor, classic.

## v2.0

It was late September 2024, I had been on-and-off playing with Lunchbox for
months. But to call wat was just released a major version would be a huge
overstatement. It simply didn't work and I had to fix it quickly. Thankfully I
didn't have a single star on GitHub yet so I had more uncertainty than pressure.

The goal at this moment was to forget about deno.land and start to release to
JSR. Add a GitHub action, and a few other quality-of-life improvements. What's
the probelm? JSR didn't support `.tsx` modules at the time. This was obviously a
big issue given that most of my code were these types of modules (like I needed
another reason to hate JSX).

Another big change coming for the second major version was using TailwindCSS for
styles. Replaced all of the CSS-in-JS with tailwind classes, a change that would
take much less effort than I imagined, `component/styles.ts` modules stopped
being needed and were deprecated. But things started to get more _atomic_ that I
would ever imagine. First, particles were officially born. These were a set of
TailwindCSS class groups and looked something like this:

```ts
// ui/particles.ts

export const clr = {
  neutral: {
    txt: "text-neutral dark:text-d-neutral",
    bg: "bg-neutral dark:bg-d-neutral",
  },
  /* ... */
};

export const txt = {
  title: "text-[3.0517578125rem]/[4.5rem]",
  /* ... */
};

/* ... */
```

Atoms, still being single HTML element components shed out the need for a setup
function. They would simply correctly manage a single HTML Element. The amount
of Atoms tripled from the start of version 1.0 to this point, but were grouped
by common purposes. For example, the Input atom group contained twelve atoms.
These looked something like this:

```tsx
// ui/atoms/Input.tsx

// <Input.Field />
export const Field = (p: HTMLInputElement) => (
  <input
    {...p}
    class={cn(
      clr.neutral.bg,
      "rounded",
      "px-2 py-px",
      p.class,
    )}
  />
);

// <Input.Label />
export const Label = (p: HTMLLabelElement) => (
  <label
    {...p}
    class={cn(
      "w-full flex",
      p.class,
    )}
  />
);

/* ... */
```

Molecules were now entirely made up of Atoms, it was as if I was coating HTML
with a thin film of default states that carried with them my opinions on what a
good practices and looks were.

```tsx
// ui/molecules/InputField.tsx

export interface iInputField {
  label: string;
}

const d: iInputField = {
  label: '',
};

function InputField(props: Partial<iInputField>) {
	const { label, ...p} = setup(d, props);
	return (
		<Input.Label class={cn("input_label", styles.label)}>
			{label}
			<Input.Field class={cn("input", styles.input)} ...p />
		</Input.Label>
	)
}
```

Good enough, but how was I to distribute it, when JSR didn't support `.tsx`
modules at the time? I got inspired by a little new UI library called shadcn/ui.
With that package you could run a command on the CLI and import directly to your
repository TailwindCSS React components ready to go. So I added the
`@lunchbox/init` module outside the main `@lunchbox/ui`. These would initialize
a new project with all the particles, atoms, molecules, and imports you could
need to start a project using Lunchbox.

```
deno run -A jsr:@lunchbox/ui/init
```

At this moment, the Malcolm in the Middle episode I mentioned resurfaces again.
I can only imagine what Hal felt when he realized his fulfilling painting
project transformed into his dreaded 9-to-5 office job. Still, as human as Hal
may appear, let's not forget he isn't a real human being, he is a character in a
show with a group of talented artists behind its design. What relates to me the
least is the perfectly gradual descent Hal has from fulfillment to dread. If I
were to write the character to show how I felt then Hal would have constant ups
and downs; the highs really high and the lows really low. He would have Eureka
moments in the middle of eating his breakfast or taking a shower and interrupt
these to quickly run to the garage; having spilled coffee on his shirt or
dripping while wearing a towel just to add that thing that just came to his
mind. Only for him to be to change his mind after a few days.

I would write his family reacting to his painting as a piece, not only to his
feelings or state of mind towards it. They could say things like "What even is
this?", "Why don't you just add X?", "Ohhh I get it (doesn't get it)", and he
would react differently to this comments. He might agree entirely and change it,
or he might disagree and defends his ideas with aggressive emotionality, or he
would agree just for him to suffer writer's (painter's) block immediately after.
Well, at this point I was about to call it quits, sell my soul to the devil and
just use complete and complex UI Framework what would reign the frontend stack.

## v3.0

Fortunately, real life is not a TV show and I can decide to just do things? Who
knew. Let's start by doing a sort of _postmortem_. What had happened in the past
few years? Immediately after questioning that I felt gratitude towards the
events that lead me here. For example, I did the jump to seniority as a
developer, and I have much to thank this project for that. It has also helped me
refine my taste, it made me curious as to how things are done in the "real"
world by the pros. After that, I started questioning this Lunchbox's purpose and
objective. Before I was strictly fooling around, but now I really wanted to give
this library a purpose.

After a few rounds of meditations, I concluded that the only thing I really need
Lunchbox to do is to provide me with the tools and their settings I need for the
interfaces of all of most of my projects. Okay, so what are these tools and
their settings?

- **Deno and Fresh v2** These have been the foundation almost since the
  beginning. I chose these tools for the server because their aligned with the
  ideas of the rest of the stack. Just a quick recap of my ramblings of
  developing Lunchbox v1. I like Deno because it's convenient, fast, standard
  oriented, opinionated (I agree with most of their opinions), and it's a small
  community on the rise, trying their luck; that's something I value and
  respect.

  The whole deal of Fresh is to render everything on the server before sending
  it to the browser. It creates a clear distinction of what code is run in the
  client and only ships JavaScript code when it's explicitly needed. Routing is
  comfy and convenient _a-la-nextjs_.

- **TailwindCSS v4 and DaisyUI v5** I don't adore tailwind, honestly. The main
  thing I dislike about it is its profound unreadability. Is as if you wanted to
  create the least readable CSS syntax. It can be mitigated with good practices
  and order and tolerated thanks to the `@vyn/cn` package that makes it slightly
  more readable. The second thing I dislike about Tailwind is their color
  palette and naming system. Almost nobody is going to properly and creatively
  choose from so many colors, it's called the paradox of choice, after all. On
  top of that I need to constantly keep track of the colors I've selected from
  the palette. "What was the color for borders, was it `slate-200` or
  `slate-300`?"

  That doesn't happen with DaisyUI, they outdid themselves with that package.
  It's built purely with CSS and limits the color palette to a functional one on
  top of their theming system. You could use JavaScript for complex
  interactivity but it is not required at all. The configurability of these
  technologies is fantastic and it wasn't hard to reduce my codebase about 80%
  since adopting these without a single aesthetic sacrifice.

This was akin to the moment the thick painting was too large to remain on the
wall and fell over Hal. This project gained too much girth after layers and
layers of paint (code). It came falling down on top of me. But again, real life
isn't a TV Show. What happened after I could crawl out of the huge block of
paint on top of me? What was left behind on the garage wall? An almost clean
slate, of course, with a few spots of paint remaining on the wall. A perfect
canvas to start anew. I thought about this exact blog and what kinds of things I
would like for Lunchbox to do for making it better.

- **Column Layout Grid System** One of my oldest's quirks when thinking about
  information architecture is to always think in terms of a grid. Not to strict
  but a predefined guidelines that help me think less about placing
  pixel-perfect components. Along with this custom `.layout` utility class, I
  added a few others.

- **Markdown Rendering** The first thing I thought about was the page's content.
  There's `@deno/gfm` out there, that parses markdown content to HTML and
  sanitizes it, then you would "dangerously set it as inner HTML" of some
  component. It's okay that it is "dangerous" because it has already been
  sanitized.

  The problem is that `@deno/gfm` doesn't count with much stylization features.
  Thankfully the `@tailwindcss/typography` plugin is made for this exact
  scenario. By simply adding the `.prose` CSS class to the content container,
  everything will be rendered according to the system's styles.

- **Keyboard Interactivity** I love to use the keyboard, not as much as those
  vim-goblins yet. I dislike how the arrow-keys make sites scroll, it's slow and
  frequently unresponsive. I'm looking for something snappier, that still works
  by focusing elements. Where tab order doesn't matter as much as visual
  proximity. Without removing the traditional tab navigation, of course.

## Projects by Consequence

Are you really making another Malcolm in the Middle reference? It's the last
one, I promise. All episodes start with a quick 1 minute sketch before the
opening credits. In this one, Hal (again, shocker) is coming home from work. He
turns tries to turn on the light but finds the lightbulb to be burned-out. He
goes to the cupboard and notices one of the shelves is loose, so he decides to
go for a screwdriver to fix it. Goes to the drawer that started to screech as it
was being opened. He goes to the garage for some W-40, but the can is empty.
Gets in his Then he gets in his car so he could go to the store to buy more but
the engine won't work. But when Lois gets home, looks at him fixing his car, and
asks "Hey could you change the lightbulb in the kitchen?" only for him to answer
angrily "What do you think I'm doing?!".

This happened to me many times, and sometimes a project would be gestated inside
Lunchbox only to be born as a fully independent package. This happened usually
when I finished a module and think to myself "hey, this is pretty cool, maybe
someone would like to use it without Lunchbox".

- **Sass-door** I called it "door" because to me it felt like a threshold in
  Sass development quality. Using this package was as if you'd "open the door"
  to work correctly with SCSS modules. Basically it was a schema validator and
  type checker for Sass. You cold declare variables to be certain types and
  functions would throw errors if the checking step failed. You could validate
  complex maps or arrays before generating the final stylesheet. As you have
  read, I haven't used SCSS in a long time, so that project is as deprecated as
  they get.

- GarliCSS This was a small meta-library I thought would be useful but got
  quickly deprecated. I planned to abstract complex Scss functionality and make
  it available for anyone to use in their design systems. It was a collection of
  mixins and functions that made it easier to manage breakpoints and grid
  systems.

- Teclas One of the APIs I hate the most to interact with is the
  `KeyboardEventListener`. Not only it is a hassle when a single element has to
  listen to a number of key combinations but there's also what I like to call
  "The Meta-Control Inconsistency". This refers to that every time you wish to
  check if the `ctrl` key has been used, you must also check if you currently
  are in a MacOS system or not. This library abstracts all of that, making it
  easier to work with key presses.

- Periodt This library is more of a funny-useless package. During the v2 release
  the system was at its _most atomic_ ever with around thirty different atoms;
  and I wanted to show it in the Library's example page. I figured it would be
  cool to showcase them in something that would look superficially similar to
  the periodic table. Not to undermine it, I understand it is one of the most
  perfectly organized graphics out there. Also, I thought that the number of
  atoms was guaranteed to increase, so manually arranging and grouping the atoms
  was out of a question. So I created this library that did just that. Creates a
  arrangement superficially similar to a periodic table of similar elements. I
  don't think I will ever use it again but It was fun to make.

## The future of Lunchbox

- Interactivity
