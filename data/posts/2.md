---
title: On Media Queries
published_at: 2022-10-31
last_edited_at: 2023-08-06
snippet: In-depth analysis of UI Libraries and their choices of breakpoints. The effectiveness of every breakpoint system is measured and ranked.
---

> All responsive websites are alike, but each unresponsive website is unresponsive in its own way.

But what are responsive websites? I'll take a deep dive into responsive web design and create a media query engine for my SCSS library GarliCSS.  Welcome. 

In order to define "responsive web design", first let us define "response". According to Google's dictionary, a response is a type of answer or reaction.  The word response makes total sense when used in loading a server request with JavaScript. In this example, the object is called a "response" because is how the server answers the request. Now, what about the adjective "responsive"? According to the dictionary, it has a slight positive connotation. What makes something responsive is to answer optimally.

So in the term responsive web design, to whom is web design responding?  Well, in this case, the word "responsive" is misleading. We established the word implies an optimal response to something. As if it was referring to a fast loading time, the server's response time to a request, or the interactivity of the interface. Which it is not, of course. But I digress.

In reality, Responsive Web design refers to the capacity of a user interface to be compatible across devices. There are three software patterns that make this possible. A flexible grid layout, flexible images, and media queries. This is what Ethan Marcotte, the person who coined the term, defined it as. I recommend his great book Responsive Web Design published by A Book Apart. 

The scope of this video is limited to media queries, I'll be sure to talk about the other key parts in future videos.

So what does an unresponsive website look like? This interface is courtesy of Deque University and was built specifically to showcase unresponsiveness. In the world's most common horizontal screen resolution 1920 x 1080, the site doesn't look that unresponsive. The page's architecture is decent, there's enough whitespace to focus on the text and the size of the components makes sense.

The unresponsiveness becomes apparent when using another device, let's say a phone with a resolution of 375 x 667, like the iPhone SE. This basic example illustrates why I feel the term "responsive" is inaccurate. The website responds at an acceptable speed to the same information on both devices. In my opinion, what the system really lacks is compatibility across devices. 

The website is doing a poor job displaying its interface in this device in particular. The top navigation and the side menu are extremely small and difficult to read. This goes both ways, interfaces that are perfectly displayed in a small vertical resolution but break on a larger and horizontal screen, are unresponsive as well.

---
