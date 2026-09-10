import { SITE_URL } from "../lib/site";
export default function sitemap() { return [
  { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
  { url: `${SITE_URL}/releases/the-acronym`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/epk`, changeFrequency: "monthly", priority: 0.7 },
]; }
