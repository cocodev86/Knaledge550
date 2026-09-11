import { SITE_URL, catalog } from "../lib/site";

export default function sitemap() {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/epk`, changeFrequency: "monthly", priority: 0.7 },
    ...catalog.map(({ slug }) => ({
      url: `${SITE_URL}/releases/${slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}
