import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Cary Plastic Surgery";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#F3EEE6",
          color: "#1b324a",
          padding: "72px",
        }}
      >
        <div style={{ width: 72, height: 4, background: "#f0c930", marginBottom: 28 }} />
        <div style={{ fontSize: 108, fontWeight: 600, letterSpacing: -4, lineHeight: 0.9 }}>CARY</div>
        <div style={{ marginTop: 14, fontSize: 28, letterSpacing: 10 }}>PLASTIC SURGERY</div>
        <div style={{ marginTop: 28, fontSize: 32, fontStyle: "italic" }}>Sculpting Beauty with a Personal Touch.</div>
      </div>
    ),
    { ...size },
  );
}
