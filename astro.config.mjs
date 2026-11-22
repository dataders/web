import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';

const legacyAnchors = new Map([
  ['Main projects', ['main-projects-title']],
  ['Side projects', ['fun-projects']],
  ['Writing and talks', ['ideas']],
  ['Open source contributions', ['open-source', 'work']],
]);

const preserveHomepageAnchors = {
  name: 'preserve-homepage-anchors',
  element: {
    filter: ['h2'],
    visit(node, context) {
      if (context.data.astro.frontmatter.layout !== '../layouts/HomeLayout.astro') return;

      for (const id of legacyAnchors.get(context.textContent(node)) ?? []) {
        context.prependChild(node, { type: 'element', tagName: 'span', properties: { id }, children: [] });
      }
    },
  },
};

export default defineConfig({
  site: 'https://anders.omg.lol',
  output: 'static',
  trailingSlash: 'always',
  markdown: {
    processor: satteri({ hastPlugins: [preserveHomepageAnchors] }),
  },
});
