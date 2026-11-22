# Anders Swanson’s portfolio

An Astro static site published at <https://anders.omg.lol/>.

## Edit the site

- Edit [src/pages/index.md](src/pages/index.md) to update the homepage. Its frontmatter holds the intro and profile links. The Markdown headings and lists make up the page, and the second-level headings also generate the section navigation.
- Add a Markdown file under [src/content/blog/](src/content/blog/). The filename becomes the URL. Copy [first-post.md](src/content/blog/first-post.md), change the title and date, and remove `draft: true` when it’s ready. Drafts are skipped by the site build, but source files in this public repository are visible.
- To show the résumé download, save your public PDF as `public/resume.pdf` and add `resume: /resume.pdf` to the frontmatter in `src/pages/index.md`.

## Preview and publish

Use Node.js 24 (the version in `.nvmrc`).

```bash
npm ci
npm run dev
```

Open <http://localhost:4321/>. To check the production build, run `npm run build`.

Push or merge changes to `main` and GitHub Actions builds and publishes the site automatically.
