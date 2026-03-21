import { ImageResponse } from "next/og";

const badges = [
  "Web Development",
  "Web Apps",
  "UI/UX Design",
  "SEO",
  "Branding",
];

export const socialImageAlt =
  "Badal Agency digital services for web development, UI UX design, branding, and SEO in Bangladesh.";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

export function generateSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background:
            "linear-gradient(135deg, #06283d 0%, #0b3c54 56%, #98c73d 100%)",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "980px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#dff0a9",
            }}
          >
            Badal Agency
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "30px",
              fontSize: "78px",
              fontWeight: 800,
              lineHeight: 1.05,
            }}
          >
            Digital agency for web, app and UI/UX growth
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "24px",
              fontSize: "30px",
              lineHeight: 1.35,
              color: "#ebf3f7",
            }}
          >
            Dhaka-based team building custom websites, web applications, design
            systems, branding assets, and SEO-ready digital experiences.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {badges.map((badge) => (
            <div
              key={badge}
              style={{
                display: "flex",
                padding: "14px 22px",
                borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,0.22)",
                backgroundColor: "rgba(255,255,255,0.14)",
                fontSize: "24px",
                fontWeight: 600,
              }}
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    ),
    socialImageSize
  );
}
