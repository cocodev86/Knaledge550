export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://knaledge550-cocodreamz.vercel.app";
export const APPLE_MUSIC = "https://music.apple.com/us/artist/knaledge550/1735556666";
export const AUDIOMACK = "https://audiomack.com/knaledge550";
export const INSTAGRAM = "https://www.instagram.com/knaledge550";

export const catalog = [
  { slug: "the-hers-tape", title: "THE HERS TAPE", type: "PROJECT", code: "550-R01" },
  { slug: "the-mix", title: "The Mix", type: "PROJECT", code: "550-R02" },
  { slug: "stuck-on-me", title: "Stuck On Me", type: "SINGLE", code: "550-R03" },
  { slug: "cupid", title: "Cupid", type: "SINGLE", code: "550-R04" },
  { slug: "oh-word", title: "Oh Word?", type: "SINGLE", code: "550-R05" },
  { slug: "the-acronym", title: "The Acronym", type: "PROJECT", code: "550-R06", featured: true },
];

export function getRelease(slug) {
  return catalog.find((release) => release.slug === slug);
}
