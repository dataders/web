---
layout: ../layouts/HomeLayout.astro
title: Anders Swanson
description: Anders Swanson’s projects, writing, talks, and open source contributions.
intro: |-
  dot connector. incorrigibly curious. thinks in public around corners. strong UX instincts built over a decade of griping to product owners. i serve the realm

  i'm a bizarro databaseologist in that I don't care about execution planning optimization but care so much about parsing and compiling!
links:
  - label: GitHub
    url: https://github.com/dataders
    icon: /icons/github.svg
  - label: LinkedIn
    url: https://www.linkedin.com/in/andersswanson/
    icon: /icons/linkedin.png
  - label: Working with me
    url: https://github.com/dataders/dataders/blob/main/WORKING_WITH_ME.md
testimonial:
  quote: “Anders, when properly engaged, can move a product forward in giant leaps at a time.”
  attribution: A colleague, quoted in
  label: Working with me
  url: https://github.com/dataders/dataders/blob/main/WORKING_WITH_ME.md
---

## Writing

[All posts](/blog/)

- **[the jagged edge of agentic analytics](/blog/the-jagged-edge-of-agentic-analytics/)**

  Field notes from the Dashboard Bakeoff on building static dashboards with agents and the decisions that still need a human.

- **[A Catalog Is All You Need](/blog/a-catalog-is-all-you-need/)**

  A Roundup essay and demo showing one local dbt project writing to Snowflake and Databricks catalogs with DuckDB and a single config change.

- **[Iceberg?? Give it a REST!](/blog/iceberg-give-it-a-rest/)**

  A Roundup essay on what Iceberg REST catalogs make possible when multiple engines share the same tables.

- **[problem exists between database and user](/blog/problem-exists-between-database-and-user/)**

  A Roundup essay on how the interfaces we use to transform data shape the way we think.

- **[The Iceberg ecosystem today](https://roundup.getdbt.com/p/the-iceberg-ecosystem-today-anders)**

  A Roundup podcast conversation with Tristan Handy about what works in production and where Iceberg catalogs still get tricky.

- **[Fusion Diaries](https://github.com/dbt-labs/dbt/discussions/15181)**

  Community updates on Fusion’s progress, rough edges, and next steps. Also see the [Coalesce edition](https://github.com/dbt-labs/dbt/discussions/15187).

- **[Proposal: External tables in dbt Core](https://github.com/dbt-labs/dbt/discussions/11265)**

  A discussion about letting dbt create and manage external tables declared in a project.

## Pretty pictures

[All diagrams and whiteboards](/gallery/)

[![Before and after open data infrastructure](/gallery/images/before-and-after-odi.png)](/gallery/)
[![Fusion distribution diagram](/gallery/images/fusion-distribution.png)](/gallery/)

## Open source

### DuckDB and Iceberg

- **[Iceberg catalog write compatibility](https://github.com/duckdb/duckdb-iceberg/pull/1017)**

  Added options for writing from DuckDB to Iceberg REST catalogs with different write capabilities.

- **[Creating Iceberg schemas concurrently](https://github.com/duckdb/duckdb-iceberg/pull/1631)**

  Fixed `CREATE SCHEMA IF NOT EXISTS` when a concurrent operation creates the same Iceberg schema first.

- **[Consistent Iceberg catalog lookups](https://github.com/duckdb/duckdb-iceberg/pull/1479)**

  Fixed a DuckDB cache issue so table names that differ only by case resolve consistently.

- **[Uppercase identifiers in DuckDB](https://github.com/duckdb/duckdb/pull/24375)**

  Added an uppercase mode for unquoted SQL identifiers to help tools interoperate with engines like Snowflake.

## Side projects

- **[ADU Adoration](https://adu.anders.omg.lol/)**

  Plans, renderings, and an interactive model for a backyard apartment.

- **[Crawl Atlas / Dungeon Crawler’s Lookbook](https://crawl-atlas.anders.omg.lol/)**

  A reading companion built with dbt Charts. Follow character stats, skills, and inventory up to where you are in the series.

- **[James River Gooners](https://gooners.anders.omg.lol/)**

  A searchable browser for Cannon’s Auctions, with filters for finding the good stuff.

- **[Dashboard Bakeoff](https://dashboard-bakeoff.anders.omg.lol/)**

  Switch between dashboards built with different frameworks to compare how they show the same dbt issue data.

## Things I helped out with at dbt

- ### Incubating dbt features

  I worked with the community on [dbt v2](https://docs.getdbt.com/docs/dbt-versions), the [dbt Information Schema](https://docs.getdbt.com/docs/build/dbt-information-schema?version=2.0) and [Checks](https://docs.getdbt.com/docs/build/checks?version=2), [Iceberg catalog support](https://roundup.getdbt.com/p/a-catalog-is-all-you-need), [Python models](https://github.com/dbt-labs/dbt/discussions/5796), and [materialized views](https://docs.getdbt.com/docs/build/materializations#materialized-view). I also built an early Iceberg prototype for [cross-platform dbt Mesh](https://www.getdbt.com/blog/introducing-cross-platform-dbt-mesh).

- ### dbt adapters

  - **Helped create** [dbt-synapse](https://github.com/microsoft/dbt-synapse) and [dbt-firebolt](https://github.com/firebolt-db/dbt-firebolt).
  - **Shepherded** the [Databricks](https://github.com/databricks/dbt-databricks), [Starburst (Trino)](https://www.getdbt.com/blog/announcing-starburst-support), and [Microsoft Fabric](https://github.com/microsoft/dbt-fabric) adapters onto the dbt platform. I also worked on [MotherDuck support in dbt](https://github.com/dbt-labs/dbt/issues/14325).
  - **Rewrote** the [DuckDB](https://duckdb.org/2026/09/22/dbt-fusion) and [ClickHouse](https://docs.getdbt.com/docs/platform/connect-data-platform/connect-clickhouse?version=2.0) adapters for dbt v2.

- **[dbt Charts](https://github.com/dbt-labs/dbt-charts)**

  I contribute to the open source tool for building dashboards with SQL and YAML. I’ve used it for [Crawl Atlas](https://crawl-atlas.anders.omg.lol/) and [Dashboard Bakeoff](https://dashboard-bakeoff.anders.omg.lol/).

### dbt Core and Fusion

- **[Scope relation cache lookups to selected schemas](https://github.com/dbt-labs/dbt/pull/15915)**

  Limited which schemas dbt looks up during compile, show, and docs generation.

- **[Issue forms for dbt Fusion](https://github.com/dbt-labs/dbt/pull/13089)**

  Created issue forms for bug reports, editor problems, and SQL understanding in the main dbt repository.
