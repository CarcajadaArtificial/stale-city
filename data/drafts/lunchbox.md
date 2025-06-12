---
stage: Drafting
---
# The story behind Lunchbox

Have you every seen the European guy that spent a few years around 2016 building a new musical instrument from scratch? He would wind it up after feeding it thousands of metal marbles, each with a clear travel across the inner pathways of the machine, ending with a collapse with a sound-making material. He called it the "Marble Machine". It represents one side of the duality of how I feel about this project.

It was an interesting project to se him build, and even his most recent development of a new version "Marble Machine 3" is cool enough. Sometimes a piece of the machine would break and would need to be replaced with a new one exactly alike, but more frequently than that he would find them to be insufficient. A part could perform deceivingly good only to fail under harsher circumstances requiring a slight redesign of that part. It was something that made it worthwhile to watch his progress videos, he was constantly fixing things, solving problems, making mistakes, redesigning, etc.

I've recently felt that this project and I have a similar dynamic. It has taught me so much about about the pure technologies that make up the web to the frameworks that create abstractions of them. But, if this Marble Machine with an infinite backlog of redesigning parts is one side of the spectrum, what is the other side?

Do you remember the early Malcolm in the Middle? There's an episode where Hal (Malcolm's dad) has a midlife work crisis after being questioned by kids in his son's school about his boring job, he takes a leave of absence from work by lying about a kidney problem, and dedicates the following weeks to create a mysterious painting inside the family garage. The whole episode revolves around the concept of employment. There is Hal's crisis as the main plot, Lois forces Francis to do unfulfilling work at the Lucky Aid market, and Malcolm struggles to take a decision on what he would like his future career to be.

Now, Hal's subplot is incredibly relatable to me, as soon as he stopped working on his 9-to-5 he stopped being miserable as well. Breakfast tasted like never before, his children went to him with questions and he gave them satisfactory advice, his relationship with Lois gets more passionate, and he looks and feels happier. Hal is shown constantly layering paint on top of paint (exclusively basic colors by the way).

But this isn't TV from the 80's, he quickly began spending the family's savings to buy canned paint and starts to live a negative arc where he slowly becomes miserable again. He grows bitter of not being able of recreate the painting inside his mind.

At the end of the episode, at the peak of his despair, Hal screams the same complaint he made when he worked in his 9-5, as if the misery would come out of any full time daily activity regardless of the level of passion, artistry or significance of the work done. The rest of the family tries to comfort Hal when he gets a sudden _eureka moment_ and _understands_ exactly wat's missing from the painting. The family watches in awe as he paints, until reaching the end when he comically paints a single quick point with the brush. They instantly _got it_, everyone admired the painting in their own individual way. At the hight of the episode, when the family gets together and everything is good, the painting comes down falling on top of Hal after showing us the sheer girth after countless of layer of paint placed on top of each other.
## Development history

When did I decide I wanted to build a component library? Well, everything started when I wanted to reinvent the wheel (React.js). You've probably heard about developers trying their luck with a "new JavaScript front-end framework". Cut me some slack, you'd hear that only millions of times back then. I'll not go into details about it right now, but with hindsight knowledge, that project's goal is a JSX alternative. Because XML/HTML-like code deeply sucks because it's as unreadable as code gets.

From there, a design system started to protude. At the beginning I called it "Juicebox" and it was a mere color palette. I would name them based on juice flavor, but it was an awkward naming system so I ended up dropping it along with the name. 

At this time, my current obsession was vanilla JavaScript. I seriously believed that it was the best way to create and manage interfaces. Libraries that altered the syntax too much were considered forbidden. Then I found out about Deno and I chose it over Node with Vite (which I still consider to be the best way to develop web applications in Node). Then, betraying my previously imposed ideals, I was pulled to the dreadful `.tsx` when the Fresh framework came out. Their philosophy for SSR and web standardization rang with me.
### Pre v1.0

It started to play around with pre-released versions of Deno and Fresh, and felt that in these technologies I could thrive. I feel like the usage of this technology has a popularity-niche balance that I like, and I'm lucky enough to be an early adopter of it. That's the perfect opportunity to make a name for myself in a relatively small community. Then I thought about reviving Juicebox but with a new goal and name. It was going to be a new component library.

The main disagreements I have with the component libraries at that time, was their grid system and their responsiveness breakpoints. I also hated how they always ran some type of non-standard client-side function for random components to work. I preferred using native HTML features with components built with best-practices in mind so you could simply not worry about it.

This is a rundown of how this stage of the project worked. It all starts with the types `iComponent` and `iElement`. Both of these would help with extending a component's arguments to include the ones of a HTMLElement that would work as the main element of the component. For example, the `<Input/>` component's properties would be of type `iComponent<HTMLInputElement>`. This type would give Partial attributes, aria mixins, and event listeners for type safety components.

```tsx
// components/Input/index.tsx

function Input(props: iComponent<HTMLInputElement>) {
	return <input ...props />
}
```

A component would have three distinct parts, all of them in their own file. The `index.tsx` file would contain all the rendering logic. As a strict practice, this file would contain almost only JSX file, in order to isolate it so that rarely would it need to be read or debugged. The `styles.scss` which then became `styles.ts` after I replaced SCSS for a CSS-in-JS library in deno.land called Resin; this file would obviously contain the component styles. Finally `setup.ts` file would make sure consistent properties are always passed to the component.

The setup function would also be composed of three distinct parts. First it was the component's property object interface. It would extend the `iComponent` type and include component-level properties. For example a `label` property for the `<Input/>` component. This string value should render a `<label/>` element with the best practices in mind. Then it would have a render function where you could process and transform the property values of the component and return the final version of them. For example, you could capitalize the Input label before rendering it.

```ts
// components/Input/setup.ts

export type iInput = iComponent<HTMLInputElement> & {
	label: string
}


export function setup(props: Partial<iInput>): iInput {
	props.label = capitalize(props.label);
	return props;
}
```

But wait didn't you say there were three distinct parts to a component's setup? I sure did, the remaining part solves an issue present in the previous codeblock. The problem is that I cannot render an `<Input/>` component without a label. What's the solution, to make the properties Partial (`Partial<iInput>`)? I don't think so, because then every property value could be undefined and it's a hassle to manage all the undefined values all the time. The ideal scenario is to have the properties be partial when calling the render function but not be so during the setup.

My solution was to create an object with the default values of all of the component properties. That way the input could always be Partial while letting me have a controlled flow of values. I made a utility function called `applyDefaults()`. The implementation of it is so simple I can showcase it next.

```ts
// src/utils.ts

export function applyDefaults<T>(d: T, i: Partial<T>): T {
	return {...d, ...i};
}
```

```ts
// components/Input/setup.ts

export type iInput = iComponent<HTMLInputElement> & {
	label: string
}

const defaults: iInput = {
	label: "Default label"
}

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

This is just a simple example of how the component implementation philosophy worked in this stage of the project. At this point there was pure HTML and CSS being render using Preact's element creator functions. Finally, without entering into much detail, `styles.ts` had a simple implementation; nevertheless, there's a hidden feature that I'd like to expose.

At this time I was a deep follower of the Atomic Design framework. I would then adapt this idea to the design patterns of my components. An "Atom" would have the intrinsic characteristic of being a component made up of _only_ one HTML element. For example, the `<Button/>` atom was made out of exclusively a single `<button/>` element with custom properties, styles, and default attribute values that made it follow good practices. Molecules were components made out of multiple HTML Elements and/or other atoms. The fictitious `<Input/>` component I've been using as an example would be a Molecule component.

```ts
// components/Input/styles.ts

const inputStyles = {
	input: css`...`,
	label: css`...`,
}
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

And that's how the first major version of Lunchbox was created. Unfortunately there was something I completely missed when testing; the CSS-in-JS library worked in the client, not the server. People with "no script" settings or browsers would see a website without any styles at all. And how did I find out? Months later thanks to a snarking comment from a Redditor, classic.
### v1.0

It was late September 2024, I had been on-and-off playing with Lunchbox for months. But to call wat was just released a major version would be a huge overstatement. It simply didn't work and I had to fix it quickly. Thankfully I didn't have a single star on GitHub yet so I had more uncertainty than pressure.

The goal at this moment was to forget about deno.land and start to release to JSR. Add a GitHub action, and a few other quality-of-life improvements. What's the probelm? JSR didn't support `.tsx` modules at the time. This was obviously a big issue given that most of my code were these types of modules (like I needed another reason to hate JSX).

Another big change coming for the second major version was using TailwindCSS for styles. Replaced all of the CSS-in-JS with tailwind classes, a change that would take much less effort than I imagined, `component/styles.ts` modules stopped being needed and were deprecated. But things started to get more _atomic_ that I would ever imagine. First, particles were officially born. These were a set of TailwindCSS class groups and looked something like this:

```ts
// ui/particles.ts

export const clr = {
	neutral: {
		txt: 'text-neutral dark:text-d-neutral',
		bg: 'bg-neutral dark:bg-d-neutral',
	}
	/* ... */
};

export const txt = {
	title: 'text-[3.0517578125rem]/[4.5rem]',
	/* ... */
}

/* ... */
```

Atoms, still being single HTML element components shed out the need for a setup function. They would simply correctly manage a single HTML Element. The amount of Atoms tripled from the start of version 1.0 to this point, but were grouped by common purposes. For example, the Input atom group contained twelve atoms. These looked something like this:

```tsx
// ui/atoms/Input.tsx

// <Input.Field />
export const Field = (p: HTMLInputElement) => (
  <input
    {...p}
    class={cn(
      clr.neutral.bg,
      'rounded',
      'px-2 py-px',
      p.class,
    )}
  />
);

// <Input.Label />
export const Label = (p: HTMLLabelElement) => (
  <label
    {...p}
	class={cn(
	    'w-full flex',
	    p.class
    )}
  />
);

/* ... */
```

Molecules were now entirely made up of Atoms, it was as if I was coating HTML with a thin film of default states that carried with them my opinions on what a good practices and looks were.

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

Good enough, but how was I to distribute it, when JSR didn't support `.tsx` modules at the time? I got inspired by a little new UI library called shadcn/ui. With that package you could run a command on the CLI and import directly to your repository TailwindCSS React components ready to go. So I added the `@lunchbox/init` module outside the main `@lunchbox/ui`. These would initialize a new project with all the particles, atoms, molecules, and imports you could need to start a project using Lunchbox.

```
deno run -A jsr:@lunchbox/ui/init
```

Right at this moment is when 
### v2.0
- Added an initialization function that generated the library's components similarly to Deno Fresh init and shadcn/ui component imports.
- Here I questioned Lunchbox's purpose in relationship with its alternatives. Why should I develop another shardcn or DaisyUI? It should be built on top of one of these.
- Full circle, going back to pure CSS but now as an extension of what isn't available in the existing frameworks in relationship with Deno Fresh.    
### Projects by Consequence

- The other Malcolm in the Middle episode where the beginning short has Hal lost in a chain of chores that artificially depend on each other to complete the original simple task.

- Sass-door
- GarliCSS
- Teclas
- Periodt
## Ideas Behind Lunchbox

- Atomic design
- Configurable components
- Interactivity abstractions making most components pure SSR
- Components being state functions
## The Current State of Lunchbox

- Built on top of DaisyUI, React-DaisyUI and Tailwind.
- Reduce a basic setup to adding a few libraries and configuring a tailwind plugin. There shouldn't be a need to generate components to the user's repository.
- Islands are abstractions of interactivity, like `<Key/>` and `<InterObs/>`.
- The styles of Lunchbox is divided into two parts: Settings inside the configuration object of DaisyUI and Tailwind and a special custom CSS that is in charge of everything too complex to be configured in variables and added via Tailwind.
	- Strict 40em, 80em, and 120em breakpoints in media queries.
	- Adaptability of light/dark mode preference.
	- A 6 and 12 column grid system with excellent configurability of cell size.
	- Additional set of useful gradients.
	- Hover and focus CSS animations.

