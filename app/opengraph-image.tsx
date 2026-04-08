import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

// Next.js file-based convention: this file generates /opengraph-image at
// build time (or on first request in dev) and Next.js automatically injects
// the resulting URL into every page's <meta property="og:image"> tag via
// the metadataBase mechanism in app/layout.tsx. 1200×630 is the Facebook /
// LinkedIn / Slack recommended size — the same image is used for Twitter
// Cards because we do not ship a twitter-image.tsx variant.
export const alt = "MyATPS — The Complete ATPL Exam Preparation Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  // Embed the branded yellow logo as a base64 data URI so ImageResponse can
  // render it without needing an external fetch at build time.
  const logoBuffer = await readFile(
    path.join(process.cwd(), "public", "assets", "logo-yellow.png"),
  );
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F7F6F7",
          // Subtle branded frame so the card has visual weight on feeds
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(238,206,132,0.35) 0%, rgba(238,206,132,0) 45%), radial-gradient(circle at 15% 85%, rgba(27,12,37,0.08) 0%, rgba(27,12,37,0) 45%)",
          padding: "60px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "40px",
            marginBottom: "30px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoBase64}
            alt="MyATPS logo"
            width={240}
            height={240}
            style={{ borderRadius: "120px" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: "120px",
                fontWeight: 700,
                color: "#1b0c25",
                lineHeight: 1,
                letterSpacing: "-4px",
              }}
            >
              MyATPS
            </div>
            <div
              style={{
                fontSize: "32px",
                fontWeight: 500,
                color: "#1b0c25",
                opacity: 0.6,
                marginTop: "16px",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Aviation Training Platform
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: "42px",
            fontWeight: 500,
            color: "#1b0c25",
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: "1000px",
            marginTop: "20px",
          }}
        >
          Pass your ATPL on the first try
        </div>

        <div
          style={{
            fontSize: "26px",
            color: "#1b0c25",
            opacity: 0.55,
            textAlign: "center",
            marginTop: "16px",
            maxWidth: "1000px",
          }}
        >
          20,000+ questions · Aviation dictionary · Live quizzes · Study assistant
        </div>
      </div>
    ),
    { ...size },
  );
}
