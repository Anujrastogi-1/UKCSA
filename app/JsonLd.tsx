// Reusable JSON-LD injector. Renders a <script type="application/ld+json">
// from any schema.org object built by lib/structuredData. Server component —
// the markup is in the initial HTML so crawlers see it without running JS.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Data is built from trusted, static sources (no user input), so this is
      // safe; JSON.stringify also escapes the content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
