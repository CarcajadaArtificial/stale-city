---
title: The Story Behind Lunchbox
published_at: 
snippet: Here is where I will document my general thoughts around this library.
---
## Introduction

Have you every seen the European guy that spent a few years around 2016 building a new musical instrument from scratch? He would wind it up after feeding it thousands of metal marbles, each with a clear travel across the inner pathways of the machine, ending with a collapse with a sound-making material. He called it the "Marble Machine". It represents one side of the duality of how I feel about this project.

It was an interesting project to se him build, and even his most recent development of a new version "Marble Machine 3" is cool enough. Sometimes a piece of the machine would break and would need to be replaced with a new one exactly alike, but more frequently than that he would find them to be insufficient. A part could perform deceivingly good only to fail under harsher circumstances requiring a slight redesign of that part. It was something that made it worthwhile to watch his progress videos, he was constantly fixing things, solving problems, making mistakes, redesigning, etc.

I've recently felt that this project and I have a similar dynamic. It has taught me so much about about the pure technologies that make up the web to the frameworks that create abstractions of them. But, if this Marble Machine with an infinite backlog of redesigning parts is one side of the spectrum, what is the other side?

Do you remember the early Malcolm in the Middle? There's an episode where Hal (Malcolm's dad) has a midlife work crisis after being questioned by kids in his son's school about his boring job, he takes a leave of absence from work by lying about a kidney problem, and dedicates the following weeks to create a mysterious painting inside the family garage. The whole episode revolves around the concept of employment. There is Hal's crisis as the main plot, Lois forces Francis to do unfulfilling work at the Lucky Aid market, and Malcolm struggles to take a decision on what he would like his future career to be.

Now, Hal's subplot is incredibly relatable to me, as soon as he stopped working on his 9-to-5 he stopped being miserable as well. Breakfast tasted like never before, his children went to him with questions and he gave them satisfactory advice, his relationship with Lois gets more passionate, and he looks and feels happier. Hal is shown constantly layering paint on top of paint (exclusively basic colors by the way)

But this isn't TV from the 80's, he quickly began spending the family's savings to buy canned paint and starts to live a negative arc where he slowly becomes miserable again. He grows bitter of not being able of recreate the painting inside his mind.

At the end of the episode, at the peak of his despair, Hal screams the same complaint he made when he worked in his 9-5, as if the misery would come out of any full time daily activity regardless of the level of passion, artistry or significance of the work done. The rest of the family tries to comfort Hal when he gets a sudden _eureka moment_ and _understands_ exactly wat's missing from the painting. The family watches in awe as he comically paints a single quick point with the brush. They instantly _got it_, everyone admired the painting in their own individual way. At the hight of the episode, when the family gets together and everything is good, the painting comes down falling on top of Hal after showing us the girth of the painting after countless of layer of paint placed on top of each other.
### History of Lunchbox Versions

- Why I started developing Lunchbox?
- How before Lunchbox, it was: AnaJS Monorepo -> AnaJS Components -> GarliCSS -> Lunchbox.
#### Pre v1.0
- This version had an implementation where I'd import GarliCSS and render components with those classes and those classes only.
- No PostCSS no Tailwind, nothing.
- Around v0.3 I changed from GarliCSS to css-in-js library called Resin.
#### v1.0
- Published for the first time to jsr.
- Realized that Resin's implementation was client-side so with disabled-js browsers, it rendered no styles. Changed to pure Tailwind styles.
#### v2.0
- Added an initialization function that generated the library's components similarly to Deno Fresh init and shadcn/ui component imports.
- Here I questioned Lunchbox's purpose in relationship with its alternatives. Why should I develop another shardcn or DaisyUI? It should be built on top of one of these.
- Full circle, going back to pure CSS but now as an extension of what isn't available in the existing frameworks in relationship with Deno Fresh.    
### Projects by Consequence

- The other Malcolm in the Middle episode where the beginning short has Hal lost in a chain of chores that artificially depend on each other to complete the original simple task.

- Sass-door
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

