---
title: "Iceberg?? Give it a REST!"
date: "2025-03-30"
description: "What Iceberg REST catalogs make possible when multiple engines share the same tables."
originalUrl: "https://roundup.getdbt.com/p/iceberg-give-it-a-rest"
---

*The new abstraction that changes nothing... and everything*

The analytics engineering landscape is shifting beneath our feet as our familiar data warehouse coalesces into the data engineer's lake house—all thanks to a powerful new abstraction. For us SQL lovers, the future paradoxically resembles both the present and past, yet the opportunity ahead is simply too compelling to ignore.

Today, I’m going to sketch out for you:

1. what exactly is this abstraction of abstractions at the heart of this sea change
2. the lay of the land today: how far things have come, what’s still holding us back, and open questions
3. \[EXTRA CREDIT\][^1] technical weeds: table format convergence, S3 tables, vended credentials, and more

To not bury the lede any further, I’ll be talking about [Apache Iceberg™️](https://iceberg.apache.org/) , and a further abstraction: the [Iceberg REST Catalog Specification](https://iceberg.apache.org/terms/#catalog) (IRC).

The current state of Iceberg isn't easy to navigate. Despite all the buzz, the technology is still young. The ecosystem changes quickly—each day brings something new, from proposals to private previews to updates in `pyiceberg`.

So what's really going on here? What matters most? Why should you care? And if even Iceberg's creator says we shouldn't have to think about it (more below), why is everyone talking about it?

Over the past year, I’ve been working with many data teams to learn and implement Iceberg in production. I'm convinced of the Iceberg’s potential to impact many more analytics engineering teams. True Iceberg adoption will happen once robustly integrated with all major data platforms but even where it has been integrated there’s last-mile user experience missing that’s dampening the adoption curve. But it’s improving everyday!

So let’s get into it!

## Iceberg: A tough nut to crack

![A nut labeled with Apache Iceberg’s SQL and ACID semantics on one side and its scalable object storage on the other.](/blog/iceberg-give-it-a-rest/iceberg-nut.jpg)

*all credit to the great Brian Olsen for this one*

Understanding Apache Iceberg is a “tough nut to crack” because it’s easy to get lost in the technical weeds and miss the big picture[^2]. Ironically, Iceberg exists so that most people don’t need to think about it at all! In the first five minutes of his talk at Data Council last year, Ryan Blue, a creator of Apache Iceberg says almost exactly that:

> *Iceberg should be invisible \[in that it should aim to\]:*
>
> - *avoid unpleasant surprises*
> - *don’t steal attention and reduce context switching*
>
> Ryan Blue, ["Why You Shouldn't Care about Iceberg"](https://www.youtube.com/watch?v=_GW3GYZK66U)

This sounds a lot to me like a powerful abstraction that lets you focus on the task at hand without getting bogged down in details.

“Bogged down in details” is an apt description for data engineering until recently. MapReduce, Hadoop, Hive, and Spark were all powerful tools that got the job done, but no one will claim that these were easy to use. You could never just write SQL — a portion of your brain was always reserved for reasoning about where and how the data was written and avoiding unpleasant surprises and edge cases. Your resulting pipeline could process petabytes of data, and you had the sweat to show for it.

“bigger data → more work” is a reasonable heuristic, but the impetus for Iceberg was an attempt to minimize the cognitive burden with a new abstraction of a table that just works like a database’s table (e.g. Postgres or SQL Server)[^3]. Iceberg isn’t a silver bullet that solves all problems with large analytic data, but it’s a stronger, empowering abstraction.

## The IRC (no not that IRC)

### The Summer of ~~Love~~ Iceberg Catalogs

Ten months ago now, in June 2024, during what we colloquially refer to as “Summit Season”, two hallmark announcements were made within 24 hours of each other.

“Iceberg steals the Summits spotlight” & “Iceberg wins the table format war!” comprise the the gist of many folks’ reactions. I largely agree, with a small tweak: the real winner was the Iceberg REST Catalog.

| Data platform | Announcement | Commitment |
| --- | --- | --- |
| Snowflake | [Polaris OSS Iceberg REST catalog](https://www.snowflake.com/en/blog/introducing-polaris-catalog/) | Committing to working with customer data regardless of where it is |
| Databricks | [Tabular acquisition](https://www.databricks.com/company/newsroom/press-releases/databricks-agrees-acquire-tabular-company-founded-original-creators) | Intention to fully integrate Iceberg REST Catalog into their flagship Unity Catalog |

### What does an IRC do for me?

If you want to know what an IRC is and does, I’ve put that section at the bottom of this post in hopes of avoiding the technical weeds and staying high-level

The IRC reminds me when I first started using Dropbox in college. Countless times, I’d often stay up all night before a deadline writing in Microsoft Word on my Macbook Pro. In the morning I’d run across campus to a desktop PC at the computer lab. In a minute I could get my paper off the internet opened in Word again so I could print it.

It’s easy now to take for granted the power of the abstraction that Dropbox represented even at a time when the Internet already existed. There was complexity behinds the scenes, but the core UX was magic in it’s simplicity: It was a folder of files that was where you wanted it to be and it just worked like a folder should. This is what I feel the IRC represents for us in data.

Coming back to data warehousing, we can replace a “folder of a dozen files” with a “schema of a dozen tables”.

So imagine that you have this schema of tables and access to many query engines like: Databricks, Snowflake, Redshift, DuckDB, Trino, and Spark.

How powerful would it be if you connect any of the engines to the schema above to read those tables, modify their data, and make new tables. Also, that others using other query engines could see those changes.

On top of that, this system does not include expensive copying of data, or working with FTP servers, Google Drive, or directly interacting with Azure Blob storage. You just connect your SQL engine to an Iceberg catalog to read and write your data. This is the promise of the IRC in conjunction with your data platform.

How might your data team operate differently in this world? This is why [we’re launching cross-platform Mesh](https://www.getdbt.com/blog/introducing-cross-platform-dbt-mesh) to support these exact multi-stack engine scenarios that more than 50% of our Cloud customers already find themselves in today.

## A Year of Progress

So where are we at today with Iceberg and where are we going as we enter summit season 2025 and beyond? The threads I want to pull on are about end-user adoption, data platform vendor integrations, and open source catalogs. I don’t have a crystal ball, but I’ll prognosticate a smidge.

### curiosity? high! adoption? lukewarm (but growing!)

At my Iceberg breakout session at Coalesce in Las Vegas last October, I asked the analytics engineers in attendance to raise their hand if they’d heard of Iceberg — all of the hands went up. When I asked those with their hands up to keep them up if they felt they could explain Iceberg to the person sitting next to them, nearly all of the hands went down.

Tellingly, this included the folks who said their teams were already using Iceberg in production. This isn’t a problem: it’s Ryan Blue’s vision in action! More-so, this is the opportunity of Iceberg via IRCs: understanding the technology isn’t necessarily a prerequisite for adoption. Maybe one person on the team sets it up. For everyone else it’s business (analytics) as usual.

### Data Platforms are showing up in a big way for the IRC

So what have the data platforms and other independent software vendors (ISVs) been up to in the past year?

HOLY COW — SO MUCH!

It's remarkable to see the entire ecosystem embrace an open-source Apache project as the foundation for their products. The vendors that have integrated deserve a huge round of applause. Yes, they’re just responding to customer demand, and yes, a real reason to invest in Iceberg is you can reallocate engineers away from maintaining proprietary table formats and work that drives more revenue.

Still, the industry's investment deserves praise, especially since taking a more self-interested and cynical approach would have been easier, at least in the short-term.

Six months ago, we predicted internally that most vendors would support the IRC spec within 6–12 months.

Today, after evaluating more private previews than I could possible count, what progress can we observe?

If we can interpret “Iceberg support” as being compliant with the spec as of six months ago, then our prediction is looking good. The only major outstanding work is something known as “external writes”.

However, as I’ve mentioned above, Iceberg itself is still evolving, so our prediction was poorly framed in the first place.

Maybe the right question to ask is

> When will IRCs be a stable abstraction such that:
>
> - end users have a stable, fully-featured interface
> - the Iceberg spec can continue to evolve under-the-hood without heavily burdening data teams using Iceberg?

Perhaps this moment comes when data platform catalogs support external writes, and this will be true in six months. Time will tell!

### OSS catalogs: important but not for end users

Databricks and Snowflake also deserve credit for also open sourcing their catalogs: [Unity Catalog](https://github.com/unitycatalog/unitycatalog) and [Polaris](https://github.com/polaris-catalog/polaris), respectively. [Lakekeeper](https://github.com/lakekeeper/lakekeeper) is another worth calling out for being written in Rust and improving quickly.

When data teams ask if I recommend self-hosting a catalog, my answer is largely “No!”. The exception here are teams that have either or both of

- enterprise security requirements (think: on-prem, self-managed data centers)
- a dedicated data platform team with the know-how to deploy critical data infrastructure.

The challenge here is that of uptime and availability. If the IRC is unresponsive, you can’t query the tables any more. A minority of teams will sign themselves up for this challenge. For most, I think your time is better invested elsewhere.

Beyond this small minority of data teams, the real value of these projects are for:

- data SaaS vendors: who need some catalog functionality
- prospective data platform customers. who need help committing to use a proprietary catalog (”worst case we migrate away and run the OSS catalog ourselves!”)

I don’t say this to cast doubt on the technology, in fact quite the opposite. All of these projects are being used today in production and are “battle-tested”. This usage serves to further refine the IRC as a standard. Everyone benefits from this, even users of proprietary catalogs.

## what might data platforms do differently?

IRCs are the clearest option for making Iceberg truly an implementation detail, but adoption is hindered when data platforms don’t truly integrate the concept into their products. Some examples of this include requiring users to:

- create a second catalog within the data platform to make data available elsewhere
- choose a unique object store path for the data when creating an Iceberg table
- mount tables individually and manage their refresh

Some data platforms are taking a cautious approach to Iceberg and REST catalogs, worrying that these might create a disjointed experience alongside their native, proprietary table formats. These platforms are instead focused on streamlining their lake house experience within their own product suite. While this concern is understandable, this becomes a game of chicken. Customers want interoperability so they risk losing customers by having a walled garden.. Iceberg has fundamentally changed how data teams evaluate tools—any platform without a clear Iceberg strategy now receives a "lock-in" red flag during vendor evaluations, even if said team has yet to start using Iceberg.

## what questions are on my mind for this Summer’s Summits and beyond?

[Iceberg Summit](https://www.icebergsummit2025.com/) is happening next week both IRL in SF as well as virtual. You should check it out!

As far as what Iceberg announcements I’m hoping for and expecting come June, here’s a list of things that, if announced, would be leading indicators for accelerated Iceberg adoption:

- support query engines to write directly to external Iceberg REST catalogs
- support mounting of a schema’s worth of Iceberg tables
- full support for catalog vended credentials
- any differentiated features that go beyond the scope of the actual Iceberg spec and are focused on UX and developer productivity

If we get all of this and more, I still have some open questions

- **what’s the multi-region and/or multi-cloud story of Iceberg catalogs?** Right now everything presumes the same cloud and same region or suffer painful egress and latency costs
- **how to federate RBAC across query engines?** we still heavily rely upon data bases to `GRANT` access to data. If the data its RBAC is managed in the IRC catalog, how is the query engine configured?
- **what are best practices for working with multiple catalogs?** more on that in a future post 😉

Thanks so much for reading — as always the comments and my DMs are open.

Should you be left wanting more, there’s four more sections that shy less away from the technical weeds.

## Technical Weeds

## What about Delta Lake?

Some of you will be frustrated that I didn’t bring up Delta Lake.

At the time of the Tabular acquisition I remember some people speculating things like this

> Databricks acquired Tabular to squash Iceberg in favor of their open table format Delta Lake.

It was refreshing to see that cynical take be put to rest so soon when [this interview](https://vimeo.com/1012543474) was posted between Michael Armbrurst and Ryan Blue (creators of Delta and Iceberg, respectively). I love this quote so much:

> It was never our intention to start a "format war" and have people spend so much time thinking about storage. It should just work and very few people should have to think about it. You should be able to focus on doing analytics.

To achieve this north star of "you don't have to think about it," they aim to standardize the two projects as much as possible. This isn't just lip service! One example touched on was their plan to standardize the `VARIANT` type implementation by [pushing it upstream into parquet itself](https://github.com/apache/parquet-format/blob/master/VariantEncoding.md).

Another great example came through [Deletion Vectors](https://docs.delta.io/latest/deletion-vectors.html) (DVs)—a feature that Delta tables had but Iceberg lacked. While Iceberg had a comparable feature called "equality deletes," it wasn't nearly as performant.

Now this work has been merged into the spec, slated for release with the Iceberg V3 table spec. This work represents a true data industry team effort with contributions from engineers at Databricks, Snowflake, Netflix, Google and more. If you're feeling brave, curious, and reading “roaring bitmap” doesn’t send you running for the hills, check out [the PR](https://github.com/apache/iceberg/pull/11238) and click around!

There's been much discussion about technology that converts between table formats, like Databricks' UniForm and Apache XTable. While these tools are essential in the short term, they'll ultimately become redundant. I'm seeing strong signals that the Delta and Iceberg teams agree not only on what the most important problems are, but also on how they should be solved. But maybe I’m being overly optimistic!

## What about S3 tables?

I’ve long been bullish on the IRC, but the [announcement of S3 Tables Buckets](https://aws.amazon.com/blogs/aws/new-amazon-s3-tables-storage-optimized-for-analytics-workloads/) and [Nikhil Benesch’s analysis](https://meltware.com/2024/12/04/s3-tables.html) made me question the assumption.

I had been thinking of IRC as an abstraction over object storage, i.e. the REST Catalog would deal with creating, naming, finding iceberg files without you having to think about it.

With Table Buckets it’s the converse. you think about S3, but don’t have to create/manage reason about an IRC. This isn’t necessarily a bad thing for both query engine developers nor end users.

For a query engine developer, you could argue that it’s easier for query engines to integrate with S3 than it is to integrate with a still evolving OpenAPI spec. They’re all already familiar with object storage!

For end users analytics engineers like us, IRCs can be a hurdle to initial Iceberg adoption because you have to set one up before you can create a single table. S3 Table buckets radically simplifies this, in that they have their own catalog behind the scenes. Not only is this catalog wildly performant like many products out of AWS, it also automatically handles maintenance tasks like file compaction. This approach has already borne fruit imho given there’s a plethora of Iceberg quickstart tutorials out there now ([Snowflake](https://aws.amazon.com/blogs/storage/connect-snowflake-to-s3-tables-using-the-sagemaker-lakehouse-iceberg-rest-endpoint/), [DuckDB](https://duckdb.org/2025/03/14/preview-amazon-s3-tables.html))

| Persona | Why Table Bucket over IRC? |
| --- | --- |
| ISV / query engine developer | S3 is already familiar primitive! |
| End user | Easier to get started; management largely solved |

I’m still very wary about asking analytics engineers to think about S3 paths when writing SQL to the extent that I still think it is an anti-pattern. This is why [dbt by default will manage the path for you when materializing a Snowflake-managed Iceberg table](https://docs.getdbt.com/reference/resource-configs/snowflake-configs#base-location). With S3 Table buckets there’s not a clear notion of a namespace to hierarchically organize tables (think: `datababe.schema.table` ).

However, just a few months later AWS S3 announced that Table buckets are available via the IRC API, so S3 Table Buckets has proven to not be opinionated on API. Perhaps their approach is the correct one in providing both UXes.

However, there’s an opportunity to simplify. While it is only natural that the S3 team would collaborate with the AWS Data Catalog team, the result is a rather disjoint end user experience.

It should not surprise us that the AWS S3 team wants to bring their expertise to making data lakes management easier and cheaper. I’d count on the team to continue evolving this product over time, so you should keep your eyes peeled as well.

## IRCs: what specifically do they do?

At the risk of oversimplifying, what the IRC does is closes some remaining gaps that kept SQL on data lakes from feeling like the SQL you’d expect.

### ~~Attention~~ Naming is all you need

One powerful abstraction of traditional SQL databases: all you need to query a table is its name, and you never have to think about where the table’s data is stored. You’ve likely never even thought about how much easier this makes your life until you don’t have it anymore. But, in data lakes, often you need to know the table’s path in the object store (e.g. S3) for it’s data.

refers to example normal SQL three-part name `my_db.my_schema.my_table` data lake object store path `S3://my-data-lake/some/folders/my-table/metadata.json`

I believe that asking analytics engineers to think about S3 paths when writing SQL is an anti-pattern. This is why [dbt by default will manage the path for you when materializing a Snowflake-managed Iceberg table](https://docs.getdbt.com/reference/resource-configs/snowflake-configs#base-location)

### sir, were you aware that was a red light you just drove through?

The other problem that the IRC solves is more behind-the-scenes. When I run a query in Postgres, I never think:

- I hope this file lands on disk successfully
- I hope no one else is trying to write to this table right now
- What if someone else deletes the files I'm writing?

We SQL users take this all for granted, but this isn’t possible with a data lake unless you have a catalog! Postgres and many other DBs play “traffic cop” for you so you don’t have to. The IRC fills this role for you on the lake

### one API to rule them all

The last problem relates to simplifying how data platforms and query engines integrate with Iceberg. Spark has never had a problem integrating with Iceberg because Iceberg is implemented in Java. But how do you

- integrate the Iceberg Java library if your database is written in Python?
- read from an Iceberg catalog written in Go with a query engine written in Rust?

The IRC solves this problem by proposing a language agnostic API and a spec for a backend service that does some work that a query engine developer previously would have had to build. This is great because it lowers the barrier to adoption by reducing the required engineering effort to integrate.

## What about IRC’s vended credentials?

Once you already have an IRC set up and configured (non-trivial work in it’s own right), the next step is to give a query engine access to it. To do so, by default the query engine must authenticate to two things in order to be able to read and write to the IRC:

- the IRC itself (typically with a personal access token)
- the object store that has the files associated with the Iceberg table

Not only is this a high-friction set-up, the experience isn’t very intuitive. For example, in this setup, when you ask the IRC for a particular table that you’d like to read, it will return to you an object store path for a file that has more info. If you don’t have access to this file in (e.g. S3), you’re SoL. That’s why this pattern also requires that the query engine also has direct access to the object store.

However, it doesn’t have to be this hard! With Vended Credentials, you only need to authenticate to the IRC, and the IRC will provision you access to the files in object store. This is a much simpler workflow than what I experienced my first time using IRCs over a year ago.

Vended credentials have been in the Iceberg spec since last June, but only recently has it been supported in platforms like Snowflake, Databricks, and SageMaker Lakehouse after a number of preview periods.

one query engine writing directly to an external IRC is also vastly simplified by vended creds. You just connect to their IRC and write the table directly without ever knowing where the data is stored.

How great to live in a world where when another team needs data from you, you never have to connect to their FTP server, Google Drive, Azure blog storage account to put the data, you just write to their IRC.

A consequence of vended credentials is that the IRC becomes critical path for accessing data, it means that you’ll have to refactor your connection later should you decide to stop using an IRC or select a different one. However the abstraction is more simple because you only need to tell your query engine about the IRC and not about object storage anymore.

The bear case here for vended credentials here is that it introduces a third access model distinct from the native RBAC of storage (i.e. IAM Policy) and the query engine (think database roles and privileges). However, you can’t have a catalog without RBAC, and the closer that RBAC lives to the data the better. It doesn’t make sense that a query engine should have roles for accessing the data, especially in a world where multiple query engines will access it!

[^1]: this post is long enough as is! but if you’re mostly up-to-speed, this section might be for you

[^2]: https://xkcd.com/2501/

[^3]: “Works like a table” effectively means ACID transactions
