import { ImageResponse } from "next/og";

/** Generates 1200×630 social-share cards: /og?title=…&eyebrow=… */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") ?? "Get more out of college. Owe less for it.").slice(0, 120);
  const eyebrow = (searchParams.get("eyebrow") ?? "College Money, Opportunity & Career Strategy").slice(0, 60);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f3ec",
          color: "#17160f",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#a4471f" }}>
          {eyebrow}
        </div>
        <div style={{ display: "flex", fontSize: title.length > 60 ? 64 : 80, lineHeight: 1.05, maxWidth: 1000 }}>{title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "2px solid #17160f", paddingTop: 28 }}>
          <div style={{ display: "flex", fontSize: 40 }}>Naomi Peters</div>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, textTransform: "uppercase", color: "#1e3a32" }}>
            More opportunity. Less debt.
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, headers: { "Cache-Control": "public, max-age=86400, immutable" } },
  );
}
