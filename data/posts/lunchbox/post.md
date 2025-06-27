---
title: Lunchbox or (The Discreet Charm of Wheel Reinventors)
published_at: 26 Jun, 2025
vignette: wheels
snippet:
  This is the story of how I built a component library that almost broke me and
  what I learned about building, breaking, and beginning again.
---

Have you ever seen the European guy who spent a few years around 2016 building a
new musical instrument from scratch? His artist name is Wintergatan, and he
would wind it up after feeding it thousands of metal marbles. Each marble would
travel along the inner pathways of the machine, eventually collapsing onto a
sound-making material. He called it the "Marble Machine." It represents one side
of the duality of how I feel about this project.

It was an interesting project to watch him build, and even his most recent
development, the "Marble Machine 3," is cool enough. Sometimes a piece of the
machine would break and need replacing with an identical part, but more often,
he found the replacements insufficient. A part could perform deceptively well
only to fail under harsher circumstances, requiring a slight redesign. Watching
his progress videos was always worthwhile; he was constantly fixing things,
solving problems, making mistakes, and redesigning.

Recently, I've felt that this project and I share a similar dynamic. It has
taught me so much, from the raw technologies that make up the web to the
frameworks that abstract them. But if the Marble Machine, with its endless
backlog of redesigns, represents one side of the spectrum, what is the other
side?

Do you remember the early _Malcolm in the Middle_? There's an episode where Hal
(Malcolm's dad) faces a midlife work crisis after being questioned by kids at
his son's school about his boring job. He takes a leave of absence from work by
lying about a kidney problem and spends the following weeks creating a
mysterious painting in the family garage. The entire episode revolves around the
concept of employment. Hal's crisis is the main plot, but Lois forces Francis to
do unfulfilling work at the Lucky Aid market, and Malcolm struggles with
choosing his future career path.

Hal's subplot is incredibly relatable to me. As soon as he stopped working his
9-to-5, he stopped being miserable. Breakfast tasted better than ever, his
children came to him with questions and left with satisfactory answers, his
relationship with Lois grew more passionate, and he looked and felt happier. Hal
is shown constantly layering paint on top of paint (exclusively using basic
colors, by the way).

But this isn't TV from the '80s. He quickly began spending the family's savings
on canned paint and spiraled into a negative arc where he became miserable
again. He grew frustrated with his inability to recreate the painting in his
mind.

At the peak of his despair, Hal screams the same complaint he made when working
his 9-to-5, as if misery stems from any full-time daily activity, regardless of
the passion, artistry, or significance of the work. The rest of the family tries
to comfort Hal when he suddenly has an _eureka moment_ and understands exactly
what's missing from the painting. The family watches in awe as he paints, only
to reveal, at the end, that he had comically added a single quick dot with his
brush. They immediately _got it_, each admiring the painting in their own way.
In the height of the episode, as the family gathers and everything feels right,
the painting falls from the wall and lands on Hal, showing the sheer weight of
countless layers of paint placed on top of one another.

## Pre v1.0: TSX and the Art of Component Maintenance

When did I decide to build a component library? Well, it all began when I set
out to reinvent the wheel (React.js). You've probably heard developers talk
about trying their luck with a "new JavaScript front-end framework." Cut me some
slack; you heard that millions of times back then. I won’t go into detail right
now, but with hindsight, I can see that the project’s goal was to create a JSX
alternative. Because let’s face it—XML/HTML-like code is incredibly unreadable.

From there, a design system started to emerge. At first, I called it "Juicebox,"
and it was merely a color palette. I named them after juice flavors, but the
naming system was awkward, so I eventually dropped both the names and the
concept.

At that time, I was obsessed with vanilla JavaScript. I truly believed it was
the best way to create and manage interfaces. I considered libraries that
altered the syntax too much to be off-limits. Then, I discovered Deno and chose
it over Node with Vite (which, by the way, I still think is the best way to
develop web applications in Node). But then, I betrayed my former ideals and
embraced the dreaded `.tsx` when the Fresh framework was released. Their
philosophy on SSR and web standardization resonated with me.

## v1.0: Portrait of a Developer as Another Web Framework

It began with experimenting with pre-released versions of Deno and Fresh, and I
quickly realized these technologies were where I could thrive. I felt that the
balance between their popularity and niche appeal was perfect, and I was
fortunate to become an early adopter. This presented an ideal opportunity to
carve out a name for myself in a relatively small community. Then, I considered
reviving Juicebox, but with a fresh goal and a new name. It would become a new
component library.

At the time, my main issues with existing component libraries were their grid
systems and responsiveness breakpoints. I also disliked how many of them ran
non-standard client-side functions just to make random components work. I
preferred to use native HTML features with components designed around best
practices, so I wouldn't have to worry about those quirks.

Here's a breakdown of how this stage of the project unfolded. It all began with
the `iComponent` and `iElement` types. These types would extend a component's
arguments to include those of an HTMLElement, which would act as the component's
main element. For instance, the `<Input/>` component's properties would be of
type `iComponent<HTMLInputElement>`. This approach would provide partial
attributes, ARIA mixins, and event listeners for type-safe components.

```tsx
// components/Input/index.tsx

function Input(props: iComponent<HTMLInputElement>) {
  return <input {...props} />;
}
```

A component consists of three distinct parts, each in its own file. The
`index.tsx` file holds all the rendering logic. As a strict practice, this file
contains almost exclusively JSX to isolate it, ensuring it rarely needs to be
read or debugged. The `styles.scss` file, which later became `styles.ts` after I
replaced SCSS with a CSS-in-JS library called Resin from deno.land, contains the
component's styles. Finally, the `setup.ts` file ensures that consistent
properties are always passed to the component.

The setup function is also divided into three distinct parts. First, it includes
the component's property object interface, which extends the `iComponent` type
and adds component-specific properties. For example, a `label` property for the
`<Input/>` component. This string value renders a `<label/>` element, adhering
to best practices. Next, the setup function includes a render function where you
can process and transform the component's property values before rendering them.
For example, you could capitalize the Input label before displaying it.

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

But wait, didn't you say there are three distinct parts to a component's setup?
I sure did. The remaining part addresses an issue in the previous code block.
The problem is that I can't render an `<Input />` component without a label.
What's the solution? Should I make the properties `Partial<iInput>`? I don't
think so. If I did that, every property value could end up being `undefined`,
and managing all those undefined values would be a hassle. The ideal scenario is
to make the properties partial when calling the render function, but not during
the setup.

My solution was to create an object with default values for all the component
properties. That way, the input could remain `Partial`, but I could still
maintain control over the flow of values. I wrote a utility function called
`applyDefaults()`. Its implementation is so simple that I can showcase it next.

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
  const p = setup(props);
  return <input {...props} />;
}
```

This is just a simple example of how the component implementation philosophy
worked during this stage of the project. At this point, we were rendering pure
HTML and CSS using Preact's element creator functions. Finally, without delving
into too much detail, `styles.ts` had a straightforward implementation. However,
there’s a hidden feature that I’d like to highlight.

At this time, I was a passionate follower of the Atomic Design framework. I then
adapted this concept to the design patterns of my components. An "Atom" would
have the defining characteristic of being a component composed of _only_ one
HTML element. For example, the `<Button/>` atom consisted solely of a single
`<button/>` element, with custom properties, styles, and default attribute
values that ensured it adhered to best practices. Molecules were components made
up of multiple HTML elements and/or other atoms. The fictitious `<Input/>`
component I’ve been using as an example would be considered a Molecule
component.

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
  const { label, ...p } = setup(d, props);
  return (
    <label class={cn("input_label", styles.label)}>
      {label}
      <input class={cn("input", styles.input)} {...p} />
    </label>
  );
}
```

And that's how I created the first major version of Lunchbox. Unfortunately, I
missed something crucial during testing: the CSS-in-JS library worked on the
client side but not on the server. People with "no script" settings or browsers
saw a website with no styles at all. How did I find out? Months later, thanks to
a snarky comment from a Redditor. Classic.

## v2.0: The Unbearable Lightness of Abstractions

It was late September 2024, and I had been working on Lunchbox on and off for
months. But calling what had just been released a "major version" would have
been a huge overstatement. It simply didn’t work, and I had to fix it quickly.
Thankfully, I hadn’t received a single star on GitHub yet, so I had more
uncertainty than pressure.

At that moment, my goal was to forget about deno.land and start releasing to
JSR. I added a GitHub action and a few other quality-of-life improvements. What
was the problem? JSR didn’t support `.tsx` modules at the time. This was a big
issue since most of my code relied on those modules (as if I needed another
reason to dislike JSX).

Another big change for the second major version was using TailwindCSS for
styles. I replaced all of the CSS-in-JS with Tailwind classes, a change that
turned out to require much less effort than I had imagined.
`component/styles.ts` modules were no longer necessary and were deprecated. But
things began to get more _atomic_ than I had ever imagined. First, particles
were officially born. These were sets of TailwindCSS class groups, and they
looked something like this:

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

Atoms, once just single HTML element components, no longer require a setup
function. They simply manage a single HTML element correctly. The number of
Atoms has tripled from version 1.0 to the present, but they are grouped by
common purposes. For example, the Input atom group now contains twelve atoms.
Here's what they looked like:

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

Molecules were now entirely made up of atoms. It felt like I was coating HTML
with a thin layer of default states, each carrying my opinions on what
constituted good practices and aesthetics.

```tsx
// ui/molecules/InputField.tsx

export interface iInputField {
  label: string;
}

const d: iInputField = {
  label: "",
};

function InputField(props: Partial<iInputField>) {
  const { label, ...p } = setup(d, props);
  return (
    <Input.Label class={cn("input_label", styles.label)}>
      {label}
      <Input.Field class={cn("input", styles.input)} {...p} />
    </Input.Label>
  );
}
```

Good enough, but how was I supposed to distribute it when JSR didn’t support
`.tsx` modules at the time? I got inspired by a small UI library called
`shadcn/ui`. With that package, you could run a command in the CLI and directly
import TailwindCSS React components into your repository, ready to go. So, I
added the `@lunchbox/init` module outside the main `@lunchbox/ui`. These modules
would initialize a new project with all the particles, atoms, molecules, and
imports you need to start a project using Lunchbox.

```
deno run -A jsr:@lunchbox/ui/init
```

AAt this moment, the "Malcolm in the Middle" episode I mentioned resurfaces. I
can only imagine what Hal felt when he realized his fulfilling painting project
had transformed into his dreaded 9-to-5 office job. Still, as human as Hal may
seem, let's not forget he isn't a real person. He's a character in a show
created by a talented team of artists. What resonates with me the least is the
perfectly gradual descent Hal experiences from fulfillment to dread. If I were
writing the character to reflect how I felt, Hal would experience constant ups
and downs, highs that would soar and lows that would plummet. He would have
Eureka moments in the middle of eating breakfast or taking a shower, only to
interrupt himself and rush to the garage, spilling coffee on his shirt or
dripping water while wearing a towel, just to act on the idea that suddenly came
to him. He would eventually change his mind after a few days.

I would write his family reacting to his painting as a piece of work, not just
commenting on his feelings or state of mind toward it. They might say things
like, "What is this?", "Why don't you just add X?", or "Ohhh, I get it (but
doesn't really get it)," and he would react differently to each comment. He
might agree entirely and make changes, or he might disagree and defensively
defend his ideas with passionate emotionality. Alternatively, he could agree
just to suffer from painter’s block immediately afterward. At this point, I was
ready to quit, sell my soul to the devil, and embrace a complete and complex UI
framework that would dominate the frontend stack.

## v3.0: Good Components Come to Those Who Refactor

Fortunately, real life isn't a TV show, and I have the freedom to decide what I
want to do. Who knew? Let's begin with a sort of _postmortem_. What had happened
over the past few years? As soon as I asked myself that, I felt gratitude for
the events that led me here. For example, I made the jump to senior developer,
and I owe a lot of that to this project. It also helped me refine my taste and
piqued my curiosity about how professionals in the "real" world do things.
Afterward, I began questioning the purpose and objectives of this Lunchbox
project. Previously, I had been toying around, but now I wanted to give this
library real purpose.

After some thoughtful reflection, I concluded that the only thing I really
needed Lunchbox to do was provide me with the tools and their settings for the
interfaces in most of my projects. Okay, so what are these tools and their
settings?

- **Deno and Fresh v2**: These have been the foundation almost from the
  beginning. I chose these tools for the server because they align with the
  ideas of the rest of the stack. Just a quick recap of my musings on developing
  Lunchbox v1. I like Deno because it's convenient, fast, standard-oriented,
  opinionated (I agree with most of their opinions), and it's a growing
  community trying to make a name for itself. That's something I respect.

  Fresh’s whole concept is to render everything on the server before sending it
  to the browser. This creates a clear distinction between what code runs on the
  client and only ships JavaScript when it's explicitly needed. Routing is
  simple and convenient, much like Next.js.

- **TailwindCSS v4 and DaisyUI v5**: I don’t adore Tailwind, to be honest. The
  main thing I dislike about it is its extreme unreadability. It feels as if you
  were trying to create the least readable CSS syntax possible. This can be
  mitigated with good practices and order, and it's somewhat tolerable thanks to
  the `@vyn/cn` package, which makes it slightly more readable. The second thing
  I dislike about Tailwind is its color palette and naming system. Few people
  will creatively and correctly choose from such a vast selection of colors,
  this is the paradox of choice. Plus, I constantly need to keep track of the
  colors I’ve selected from the palette. “What was the color for borders again?
  Was it `slate-200` or `slate-300`?”

  DaisyUI, however, excels in this area. It's built entirely with CSS and limits
  the color palette to a functional one with a theming system. You can use
  JavaScript for complex interactivity, but it's not required at all. The
  configurability of these technologies is fantastic, and it wasn’t difficult to
  reduce my codebase by about 80% without sacrificing any aesthetics.

This moment felt akin to the time when the thick painting became too large to
stay on the wall and eventually collapsed onto Hal. The project gained too much
substance after layers of paint (or code). It all came crashing down on top of
me. But once again, real life isn't a TV show. After crawling out from under the
massive heap of paint, what remained on the wall? An almost blank canvas, of
course, with just a few spots of paint left. A perfect starting point for a
fresh beginning. I reflected on this very blog and thought about what I would
like Lunchbox to do to improve it.

- **Column Layout Grid System**: One of my oldest habits when thinking about
  information architecture is to always think in terms of a grid. Not too
  strictly, but with predefined guidelines that help me avoid worrying about
  placing pixel-perfect components. Along with this custom `.layout` utility
  class, I added a few others.

- **Markdown Rendering**: The first thing I considered was the page’s content.
  There’s `@deno/gfm`, which parses markdown to HTML and sanitizes it. Then, you
  "dangerously" set it as inner HTML of a component. It's okay because it has
  already been sanitized.

  The problem is that `@deno/gfm` lacks much in the way of styling features.
  Thankfully, the `@tailwindcss/typography` plugin solves this exact issue. By
  simply adding the `.prose` class to the content container, everything renders
  according to the system’s styles.

- **Keyboard Interactivity**: I love using the keyboard, though not as much as
  those vim enthusiasts. I dislike how arrow keys make sites scroll slowly and
  often unresponsively. I’m looking for something snappier that still works by
  focusing elements, where tab order doesn’t matter as much as visual proximity.
  Of course, this won’t remove the traditional tab navigation.

## Projects by Consequence

Are you really making another Malcolm in the Middle reference? Okay, this is the
last one, I promise. Every episode begins with a quick one-minute sketch before
the opening credits. In this one, Hal (again, shocker) is coming home from work.
He tries to turn on the light but finds the bulb burned out. He goes to the
cupboard and notices one of the shelves is loose, so he grabs a screwdriver to
fix it. The drawer starts screeching as he opens it. He heads to the garage for
some WD-40, but the can is empty. He gets into his car to drive to the store,
only to find the engine won’t start. But when Lois gets home, she sees him
fixing his car and asks, “Hey, could you change the lightbulb in the kitchen?”
He answers angrily, “What do you think I’m doing?!”

This has happened to me many times, and sometimes a project gestates inside
Lunchbox only to be born as a fully independent package. This typically happens
when I finish a module and think to myself, “Hey, this is pretty cool; maybe
someone would want to use it without Lunchbox.”

### Sass-door: Schematic Sass, closed forever.

I called it "door" because it felt like a threshold in Sass development quality.
Using this package was like "opening the door" to working correctly with SCSS
modules. It was basically a schema validator and type checker for Sass. You
could declare variables to ensure they were of certain types, and functions
would throw errors if the checks failed. You could validate complex maps or
arrays before generating the final stylesheet. As you can guess, I haven’t used
SCSS in a long time, so this project is as deprecated as they come.

### GarliCSS: Useful for five minutes.

This was a small meta-library I thought would be useful but was quickly
deprecated. I planned to abstract complex SCSS functionality and make it
available for anyone to use in their design systems. It was a collection of
mixins and functions to help manage breakpoints and grid systems.

### Teclas: And the Curious Case of the Apple Command Key

One of the APIs I dislike interacting with the most is the
`KeyboardEventListener`. Not only is it a hassle when a single element needs to
listen for multiple key combinations, but there's also what I call "The
Meta-Control Inconsistency." This refers to the need to check if you're on a
MacOS system when determining whether the `ctrl` key is used. This library
abstracts all of that, making it easier to work with key presses.

### Periodt: Why the Hell Did I Build This?

This library was more of a fun, useless package. During the v2 release, the
system was at its most atomic, with around thirty different atoms, and I wanted
to showcase them on the Library's example page. I thought it would be cool to
present them in a layout resembling the periodic table. Not to undermine the
periodic table itself (it's one of the most perfectly organized graphics out
there) but I knew the number of atoms would keep increasing, so manually
arranging and grouping them wasn’t an option. I created this library to
automatically arrange them in a manner similar to the periodic table. I doubt
I’ll ever use it again, but it was fun to build.

## Conclusion

Looking back, this project became less of a tidy codebase and more of a
confession booth for my developer neuroses. I kept chasing the perfect
abstraction, only to rip it out the next morning when it stopped feeling right.
Somewhere between spilled coffee, midnight refactors and that ridiculous moment
when a single dot was all I really needed, I discovered that every “failure” was
just another step toward something unexpectedly useful.

What survives the chaos isn’t the version number or the fancy CLI command you
might install; it’s the curiosity that refuses to let me settle for “good
enough.” I learned to embrace the absurdity of reinventing wheels, to laugh at
my own obsession with unreadable syntax, and to welcome the blank canvas that
emerges after the paint overload finally collapses.

So here’s the deal: Lunchbox will keep changing, because I will. And that’s the
real win. If you’ve read this far, take this as an invitation to break your own
project in half, toss out what weighs you down, and see what tiny spark remains.
That spark (however small) is where the real fun begins.
