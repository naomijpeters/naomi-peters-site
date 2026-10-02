/**
 * A deliberately small Markdown renderer for articles (no dependencies).
 *
 * Supported:  ## / ### headings · paragraphs · **bold** · *italic* · `code`
 *             [links](https://…) · - bullet lists · 1. numbered lists
 *             > quotes · --- dividers · ![alt](/images/…) images
 *             [[starter-kit]]  → inserts the free Starter Kit signup box
 *             [[book-call]]    → inserts a "book a free call" prompt
 *
 * All text is HTML-escaped before formatting, so article content cannot inject markup.
 */

export type Block =
  | { type: "html"; tag: "p" | "h2" | "h3" | "blockquote"; html: string; id?: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "hr" }
  | { type: "image"; src: string; alt: string }
  | { type: "starter-kit" }
  | { type: "book-call" };

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function safeHref(href: string): string | null {
  return /^(https?:\/\/|\/|mailto:|#)/i.test(href) ? href : null;
}

export function inline(text: string): string {
  let out = escapeHtml(text);
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label: string, href: string) => {
    const safe = safeHref(href);
    if (!safe) return label;
    const external = /^https?:\/\//i.test(safe);
    return `<a href="${safe}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${label}</a>`;
  });
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
  return out;
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

export function parseMarkdown(source: string): Block[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let quote: string[] = [];

  const flush = () => {
    if (paragraph.length) {
      blocks.push({ type: "html", tag: "p", html: inline(paragraph.join(" ")) });
      paragraph = [];
    }
    if (list) {
      blocks.push({ type: "list", ordered: list.ordered, items: list.items.map(inline) });
      list = null;
    }
    if (quote.length) {
      blocks.push({ type: "html", tag: "blockquote", html: inline(quote.join(" ")) });
      quote = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    if (line === "[[starter-kit]]" || line === "[[book-call]]") {
      flush();
      blocks.push({ type: line === "[[starter-kit]]" ? "starter-kit" : "book-call" });
      continue;
    }
    if (/^---+$/.test(line)) {
      flush();
      blocks.push({ type: "hr" });
      continue;
    }
    const heading = /^(#{1,3})\s+(.*)$/.exec(line);
    if (heading) {
      flush();
      const tag = heading[1].length === 3 ? "h3" : "h2";
      blocks.push({ type: "html", tag, html: inline(heading[2]), id: slugify(heading[2]) });
      continue;
    }
    const image = /^!\[([^\]]*)\]\(([^)\s]+)\)$/.exec(line);
    if (image && safeHref(image[2])) {
      flush();
      blocks.push({ type: "image", alt: image[1], src: image[2] });
      continue;
    }
    const bullet = /^[-*]\s+(.*)$/.exec(line);
    const numbered = /^\d+[.)]\s+(.*)$/.exec(line);
    if (bullet || numbered) {
      const ordered = Boolean(numbered);
      if (paragraph.length || quote.length || (list && list.ordered !== ordered)) flush();
      if (!list) list = { ordered, items: [] };
      list.items.push((bullet ?? numbered)![1]);
      continue;
    }
    if (line.startsWith(">")) {
      if (paragraph.length || list) flush();
      quote.push(line.replace(/^>\s?/, ""));
      continue;
    }
    if (list || quote.length) flush();
    paragraph.push(line);
  }
  flush();
  return blocks;
}

/** Minimal front-matter reader: `key: value` lines between --- fences. */
export function parseFrontMatter(source: string): { data: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(source);
  if (!match) return { data: {}, body: source };
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z][\w-]*)\s*:\s*(.*)$/.exec(line);
    if (!kv) continue;
    data[kv[1]] = kv[2].trim().replace(/^["'](.*)["']$/, "$1");
  }
  return { data, body: match[2] };
}
