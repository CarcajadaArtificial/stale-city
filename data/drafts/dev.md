So... what does it feel like? Do you regret creating this hyper niche module now
that Tailwind has taken over? Not at all, it feels great and I seriously love
Lunchbox. I'm maintaining, upgrading, and using it indefinitely. What I've had
my doubts about is having chosen the "right niche". Don't get me wrong, I love
Deno and Fresh; it was rationally chosen as my personal go-to framework for
everything I'm doing. Still, I feel a little nervous, is it future-proof enough?
Of course not, if I'd really wanted future proof I would be a C developer. Like
the rest of the mad men that are, much respect to you, of course.

> "There are two types of developers, those who have developed a compiler and
> those who haven't." - Yes, this is (sort-of) the quote of THAT crazy
> developer.

Sometimes I think about him, empathizing with his madness, full ugly madness.
Still, I've always found inspiring his will to build from scratch, redeveloping
the wheel individually as much as spiritually. I think I understand that, not
that I think that Lunchbox is the building blocks of the kingdom of heavens; or
that I'm God's personal developer on a mission to create opinionated components
on a niche Node alternative. Of course not, nevertheless developing Lunchbox
felt purposeful. I have my vision of what it is, and I'm simply building it, not
only because I can, but because I want.￼

Why do I want to build it? Why do I like it so much? I think it is just a matter
of taste. At the end, that's all there's to it, good or bad taste. If I see TSX
code, I feel predisposed to hate it, most of the time people flood this part of
the code with conditionals, Tailwind classes, wrappers, contexts, attributes,
styles, etc. Many of these shouldn't require to read JSX markup, others like
Tailwind classes are completely avoidable. I would rather build this markup code
with reliable and predictable elements and components so that I can reduce the
mental stack of building markup and focus on business rules functionalities.

What's my end goal? To build things with it. I see myself creating a bunch of
useful plugins for Deno Fresh. Wrappers of utility pages that could be useful
for developing sites. For example:

1. Firestore-like interface for managing Deno KV.
2. User registration, authentication, and management pages liked to Deno KV.
3. A simple "CMS" that could manage markdown and json files inside a '/data'
   directory.
4. An outside module viewer where one could see if a module is outdated.

These are nothing but thought's I've had. Things that might be cool to have when
developing a web application. Still, these are things I'm building with
Lunchbox, but regarding updates for it, I've had a few ideas as well.

For starters, the Autocomplete island is too complex for v1.1, it should be
moved to a further update. I thought about a useful and abstract island that
will be the main focus of this update. It's still officially untitled, but I've
thought about "Revealer". This island could have a simple revealed/hidden state
that changes when the link is clicked. Revealing the component's child that was
originally hidden. The default "See More" link could be overwritten with
whatever element of the user's choosing.

Also in the v1.1 update, I see fixes for the Loading component. I did really bad
with it, because I tested it superficially. Some scenarios break the component,
while others make the component irrelevant. I must update more oriented to the
good practices of React loading states. I suppose a small research is required
for this.

Besides this two upgrades I don't see that much else to include. I've thought
about deprecating the "noMargins" attribute from the Text component. Also,
extend the "label" attribute of the Input components, make it of type
ComponentChild instead of only string. This would be a direct upgrade of the
attribute that wouldn't break the instances of it after update. The use case for
this is having inputs of type checkbox or radio where a more complex component
is being selected instead of simple text.
