import type { APIContext } from "astro";

export function GET({ site }: APIContext): Response {
  // TODO: Edit the environment variables if not deploying to Vercel.
  const content = `User-agent: *
Disallow: ${import.meta.env.PROD && import.meta.env.VERCEL_ENV === "production" ? "" : "/"}

Sitemap: ${new URL("sitemap-index.xml", site).href}`.trim();

  return new Response(content);
}
