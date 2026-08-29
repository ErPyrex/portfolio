import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        fontSize: 24,
        background: "#09090b", // Deep black background matching site
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #27272a", // Zinc-800 border
        borderRadius: "8px",
        position: "relative",
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Futuristic modern P path */}
        {/* Loop / upper curve */}
        <path
          d="M6 20V4H14.5C17.5 4 19.5 6 19.5 9C19.5 12 17.5 14 14.5 14H10"
          stroke="#6366f1"
          strokeWidth="3.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        {/* Tech stem/caret accent */}
        <path
          d="M10 14V20"
          stroke="#a5b4fc"
          strokeWidth="3.5"
          strokeLinecap="square"
        />
        {/* Laser-like indicator dot */}
        <circle cx="14.5" cy="9" r="1.5" fill="#f43f5e" />
      </svg>
    </div>,
    {
      ...size,
    },
  );
}
