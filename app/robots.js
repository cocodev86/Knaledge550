import { SITE_URL } from "../lib/site";

export default function robots() {
  const isProduction = process.env.VERCEL_ENV === "production";
  return {
    rules: [{ userAgent: "*", ...(isProduction ? { allow: "/" } : { disallow: "/" }) }],
    sitemap: isProduction ? `${SITE_URL}/sitemap.xml` : undefined,
  };
}
