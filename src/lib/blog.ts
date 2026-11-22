import { getCollection } from 'astro:content';

export async function getPublishedPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.localeCompare(a.data.date) || a.id.localeCompare(b.id));
}

export const formatPostDate = (date: string) =>
  new Intl.DateTimeFormat('en', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(date));
