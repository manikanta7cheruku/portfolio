import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d0c0b",
          color: "#7fb8a8",
          fontSize: 38,
          fontStyle: "italic",
        }}
      >
        MC
      </div>
    ),
    size,
  );
}
