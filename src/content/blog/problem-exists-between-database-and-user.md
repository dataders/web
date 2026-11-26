---
title: "problem exists between database and user"
date: "2023-07-30"
description: "How the interfaces we use to transform data shape the way we think."
originalUrl: "https://roundup.getdbt.com/p/problem-exists-between-database-and"
---

*tools aren't "the thing" -- it's how we interact with them that counts*

Hi — I’m Anders, a Developer Experience advocate at dbt Labs. In a few days, I’m signing off to vacation at a lakeside cabin in upper Ontario. There’s an op-ed about family vacations that’s stuck with me over the years, [The Myth of Quality Time](https://www.nytimes.com/2015/09/06/opinion/sunday/frank-bruni-the-myth-of-quality-time.html), whose thesis is:

> Close relationships stem from deep, intimate conversations. Said conversations surface in the presence of an overabundance of unstructured time, and can’t be forced.

When there’s space to think, feel, and connect, there’s the greatest opportunity to both talk and think deeply about our places in the world. I have many such memories at my family cabin, I hope to have some this summer, and that all you data people experience the same soon.

Even at work, I think it’s important to have these conversations. In that spirit, I’d love to go deep with you as I attempt to navigate the intersection of:

- language and cognition
- interface design for data transformation
- what we, as data practitioners, can learn from the above.

The goal here is not to be prescriptive, but rather to encourage discourse on the ecosystem of tools we have today.

Before we get into it: a promise, a definition, and a chewy illustration

> **promise**<br>
> there will be 3 [Wittgenstein](https://en.wikipedia.org/wiki/Ludwig_Wittgenstein) quotes

> **data transformation API (DTAPI)[^1]**<br>
> a written interface by which data professionals can describe and execute transformations against data.<br>
> common examples:<br>
> `SQL`, `jinja-sql`, `pandas`, `dplyr`, `pyspark`, `metricflow` `ibis`, `polars`, `PRQL` , `siuba`

![An illustrated example of linguistic relativity contrasting an English sentence with its Shawnee counterpart.](/blog/problem-exists-between-database-and-user/linguistic-relativity.jpg)

---

## where shall we begin

> The limits of my language mean the limits of my world — Wittgenstein

I started my dbt journey as a community member with the singular goal of enabling my team to use dbt with an as of then unsupported database. I became obsessed helping to translate the abstractions of dbt into as many and as varied data platforms as possible.[^2]

Now I work here and you can find me in the database-specific channels ( `#db-{DATABASE} `) on our community Slack and responding to adapter-related issues on GitHub.

An inevitable outcome of my journey is that I now possess esoteric knowledge on the syntactic differences across the various flavors of SQL. A weird side benefit of being in the weeds on this is that you cannot help but see the effect that the design of these interfaces has on the ways we do data work.

By means of a philosophical side-quest, I’d like to convince you that:

- we live in a world where our DTAPIs are at times intractably coupled to the things that do the transformations for us,
- but, the ability to consider “which interface feels best suited for describing the transformation problem at hand?”, and then pick one is a world we should all like to live in

## meta-rationality

As craftspeople, we inevitably talk shop. The age-old rag is to debate the merits of our choice in hammers (read: “stacks”) we use. But, tools aren’t the thing — it’s the dynamic system in which we as users interact with those tools. When done well, and the system is symbiotic, we call this “flow state” (h/t [King Sung](https://sungwc.substack.com/p/flow-state-data-engineering-i-want)).

In this, I find a clear parallel to the principle of [linguistic relativity](https://en.wikipedia.org/wiki/Linguistic_relativity), which I’d paraphrase (poorly) as:

> language affects how people think,<br>
> which in turn affects how people see the world

I heavily recommend rabbit-holing on the Wikipedia article with the caveat that it’s mostly conjecture, which means it’s been wielded poorly and harmfully in the past.

That said, here’s some cherry-picked examples of linguistic relativity that I find interesting. I’ll leave their interpretation as an exercise for the reader.

- [Speakers of Kuuk Thaayorre](https://bigthink.com/articles/purpose-as-a-compass/) whose greetings change depending on their current orientation w.r.t. cardinal directions
- Language and gender. Insert PhD theses here. [Ancillary Justice](https://en.wikipedia.org/wiki/Ancillary_Justice) played a lot with this
- [Polysemy](https://en.wikipedia.org/wiki/Polysemy): one language has a single word for something, but another has many variations, indicating that knowing the latter language introduces you to more nuance than you’d otherwise have.
- [Reverse Polish](https://en.wikipedia.org/wiki/Reverse_Polish_notation)

## `philosophy.apply()`

Linguistic relativity comes into play when we’re working with a particular DTAPI, where each is an interface that provides us with a unique set of affordances and constraints (see [Bad Doors](https://www.youtube.com/watch?v=yY96hTb8WgI)).

- SQL has a required order of keywords `SELECT` before `FROM` before `WHERE`
- Spark necessitates [lazy-evaluation](https://en.wikipedia.org/wiki/Lazy_evaluation) because it was built for distribution computation
- The [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) model encourages outputting and examining intermediate results because it’s a notebook not a script
- `ggplot2` forces you to think of charts as composed of distinct, inter-operable layers because it was heavily influenced by the Grammar of Graphics

The problems we solve are constrained, and equally enabled, by the interfaces in which we solve them. Extending [Winnie’s astute metaphor from last week](https://roundup.getdbt.com/p/for-the-love-of-the-game), if describing data transformations is a video game, when was the last time you thought of your controller while playing?

![A Venn diagram shows “Think it” under cognition, “Do it” under computation, and “Describe it” where they overlap.](/blog/problem-exists-between-database-and-user/cognition-and-computation.png)

*Source: ["Why dplyr"](https://www.youtube.com/watch?v=dWjSYqI7Vog) Hadley Wickham 2014*

### The future

> *Problems are solved, not by giving new information,<br>
> but by arranging what we have known since long — big Witty*

The data nerds like me may be silently shouting, “Anders, there’s already a single language to describe data transformation! It’s called relational algebra!”. But, if relational algebra were all we needed, SQL would never have been invented and still in use today.

If the last decade brought undeniable impressive advancements in tooling, then the next decade might do the same for our interfaces.

All of the above is to explain why I am so excited about projects like [Substrait](https://substrait.io/), [Arrow](https://arrow.apache.org/overview/), and Voltron Data’s contributions to [Arrow Flight SQL](https://voltrondata.com/resources/apache-arrow-flight-sql-arrow-for-every-database-developer) and [ibis](https://ibis-project.org/). If you aren’t sold on their relevance to you, check out Wes McKinney’s [10 Things I Hate About pandas](https://wesmckinney.com/blog/apache-arrow-pandas-internals/).

Here’s the world I want to live in:

1. The value of choosing one tool over another doesn’t affect the end result. Rather, it’s a structure used to facilitate the describing of instructions, much like tabs and spaces
2. Moving between data transformation APIs is as easy as possible
3. New interfaces can spring up, gain adoption, evolve, and influence other DTAPIs

Part of me feels as if we cannot truly know these data transformation APIs until we can reach for and switch between them with as little friction as possible.

My ask of you, dear reader, is to imagine what this world would be like. Start thinking as if we already live in this world. Curious about some new DTAPI? Go try it out and ask yourself:

1. What feels new or different? Why is it like that?
2. How does learning that language affect your craft of analytics engineering?
3. What concepts might you bring back to your daily driver DTAPI?

Before I leave you and go to the woods to live lazily, I’d love to hear from you. Agree? Disagree? Reach out to me in the community Slack! You’d be doing my colleagues a favor, as it’s a punchline now internally the reliability with which I can be found talking about Arrow and Substrait.

I’ll leave you with one final slightly-modified quote from ["Luki" W](https://en.wikipedia.org/wiki/Ludwig_Wittgenstein#Realschule_in_Linz)

> *~~Philosophy~~ Analytics engineering is a battle against the bewitchment of our intelligence by means of ~~language~~ data transformation APIs - *

## Links

I can’t waste my time in the spotlight without sharing links, which is what we’re all really here for, right?

### PRQL

long-time dbt community member Maximillian Roos (aka [max-sixty](https://github.com/max-sixty)) has created [PRQL](https://prql-lang.org/), a DTAPI that SQL-loving dbt users would find interesting. I encourage you all to check it out and experiment in the provided sandbox. Of additional interest are

- [Discussion dbt-core#5796: dbt & Python: language agnosticism](https://github.com/dbt-labs/dbt-core/discussions/5796) where max-sixty chimes in
- the [Hacker News discussion](https://news.ycombinator.com/item?id=36866861) about the merits PRSQL, where you find age-old tropes like “this is pointless, SQL is fine”, “why is SQL still around?”, “I hate SQL”.

### meta-rationality

[A fully meta-rational workplace](https://metarationality.com/meta-rational-workplace)

Jason Ganz shared this with me and I can’t stop thinking about it. What does it take to truly foster a culture of innovation, and, more importantly, survive within one?

### PEP 703: no-GIL Python

[PEP 703 – Making the Global Interpreter Lock Optional in CPython](https://peps.python.org/pep-0703/)

I’d be hard-pressed to rationalize Python’s Global Interpreter Lock (GIL) as relevant to analytics engineers. It concerns how Python handles multi-threaded code, which is [not for the faint of heart](https://bholley.net/blog/2015/must-be-this-tall-to-write-multi-threaded-code.html).

Still I found the proposal’s introduction comfortingly accessible — it describes the issue at hand and real-world impacts, more than a few of which come from the data industry. Here’s how the corresponding Discourse thread kicks it off:

> The document is somewhat of a demanding read as it’s one of the top 10 longest PEPs. That was to be expected though as the problem goes back decades and requires nuance, trade-offs, and careful consideration of alternatives. Thanks in advance for your time reading the PEP and iterating on it with us.

I can’t say I fully understand what’s going on here, but you can plainly observe no shortage of wariness of both the consequences of this change and Python Software Foundation (PSF)’s ability to navigate it given the Python 2→3 “fiasco”. Nevertheless, I’m so grateful for the humans of the PSF on whose shoulders we stand. This change is targeted to land in Python 3.13 in October 2024.

### Patterns Fool Ya

[How They Fool Ya (live) | Math parody of Hallelujah](https://www.youtube.com/watch?v=NOCsdhzo6Jg)

[You’re still here?](https://www.youtube.com/watch?v=T1XgFsitnQw) Here’s a treat for having made it to the bottom. Who doesn’t love some Leonard Cohen parodies about math? Grant Sanderson is in a league of his own with his 3Blue1Brown channel full of incredible animated explanations of mathematical concepts. Last month, he shared a different format, and the song and lesson to data practitioners has been stuck in my head ever since.

[^1]: **DTAPI** is abbreviated out of convenience for this newsletter alone, please let’s never use it again

[^2]: [What are adapters? Why do we need them?](https://docs.getdbt.com/guides/dbt-ecosystem/adapter-development/1-what-are-adapters)
