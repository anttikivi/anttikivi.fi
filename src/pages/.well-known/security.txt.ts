export function GET(): Response {
  // TODO: Edit the environment variables if not deploying to Vercel.
  const content = `
Contact: mailto:antti@anttikivi.fi
Expires: 2025-06-04T09:00:00.000Z
Preferred-Languages: en, fi
Canonical: https://www.anttikivi.fi/.well-known/security.txt
`.trim();

  return new Response(content);
}
