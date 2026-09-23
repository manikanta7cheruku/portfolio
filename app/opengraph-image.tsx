import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
          background: "#0d0c0b",
          color: "#ebe6db",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#a39d92", marginBottom: 28 }}>
          {site.location}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 132, lineHeight: 1 }}>
          <span>Manikanta</span>
          <span>Cheruku</span>
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "#7fb8a8", marginTop: 36 }}>
          {site.role}
        </div>
      </div>
    ),
    size,
  );
}
