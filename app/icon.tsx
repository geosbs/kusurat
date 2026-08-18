import { ImageResponse } from "next/og";

export const size = { width: 48, height: 48 };
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
          background: "#0B1F33",
          color: "#6B8B47",
          fontSize: 22,
          fontWeight: 700,
        }}
      >
        G
      </div>
    ),
    size,
  );
}
