import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
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
          backgroundColor: "#000000",
          borderRadius: "8px",
          border: "1px solid rgba(255, 255, 255, 0.15)",
        }}
      >
        {/* Barber Pole Stripes Minimalistas a 45 graus */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "22px",
            height: "22px",
            transform: "rotate(-45deg)",
            gap: "2.5px",
          }}
        >
          <div
            style={{
              width: "4px",
              height: "20px",
              backgroundColor: "#ef4444",
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              width: "4px",
              height: "20px",
              backgroundColor: "#ffffff",
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              width: "4px",
              height: "20px",
              backgroundColor: "#3b82f6",
              borderRadius: "2px",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
