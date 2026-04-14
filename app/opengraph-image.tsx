import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

// Next.js file-based convention: this file generates /opengraph-image and
// the result is automatically wired into <meta property="og:image"> and
// <meta name="twitter:image"> on every page via the metadataBase mechanism
// in app/layout.tsx. 1200×630 is the Facebook / LinkedIn / Slack standard
// — Twitter Card previews use the same image because there is no
// twitter-image.tsx variant.
export const alt = "MyATPS — The Complete ATPL Exam Preparation Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  // Embed the canonical transparent-background brand logo as a base64 data
  // URI so ImageResponse can render it without needing an external fetch
  // at build time.
  const logoBuffer = await readFile(
    path.join(process.cwd(), "public", "assets", "logo-myatps.png"),
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
          // Clean neutral background matching the site body — no yellow.
          // Subtle corner radial gradients pick up the brand palette
          // (pink/cream/navy) without drawing attention away from the A.
          backgroundColor: "#F7F6F7",
          backgroundImage:
            "radial-gradient(circle at 88% 12%, rgba(211,123,255,0.18) 0%, rgba(211,123,255,0) 50%), radial-gradient(circle at 12% 88%, rgba(255,171,131,0.18) 0%, rgba(255,171,131,0) 50%)",
          padding: "60px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "48px",
            marginBottom: "36px",
          }}
        >
          <img
            src={logoBase64}
            alt="MyATPS logo"
            width={260}
            height={260}
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
                fontSize: "124px",
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
                fontSize: "30px",
                fontWeight: 500,
                color: "#1b0c25",
                opacity: 0.55,
                marginTop: "18px",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Aviation Training Platform
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: "44px",
            fontWeight: 500,
            color: "#1b0c25",
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: "1040px",
            marginTop: "16px",
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
            marginTop: "18px",
            maxWidth: "1040px",
          }}
        >
          20,000+ questions · Aviation dictionary · Live quizzes · Study assistant
        </div>
      </div>
    ),
    { ...size },
  );
}
