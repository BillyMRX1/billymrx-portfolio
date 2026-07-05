import { ImageResponse } from "next/og";

export const alt = "Brilian Ade Putra · AI Engineer in Tokyo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Static 1200x630 social card generated at build time. Mirrors the site's
// dark theme tokens (OLED black, Apple dark-mode blue accent).
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              backgroundColor: "#0a84ff",
            }}
          />
          <div style={{ fontSize: 30, color: "#a1a1a6", letterSpacing: 2 }}>
            billymrx.com
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              color: "#f5f5f7",
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            Brilian Ade Putra
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 40,
              color: "#a1a1a6",
              display: "flex",
            }}
          >
            AI Engineer at Honda · Tokyo, Japan
          </div>
        </div>

        <div style={{ fontSize: 34, color: "#0a84ff", fontWeight: 600 }}>
          Intelligence, shipped.
        </div>
      </div>
    ),
    size,
  );
}
