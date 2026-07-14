/**
 * Cap Expertises — Tailwind config (direction « Le Cap »)
 * Miroir de tokens.css pour l'implémentation Next.js + Tailwind.
 * Usage : utiliser les classes (bg-cap-navy, text-cap-ink, rounded-cap-xl, shadow-cap-card…)
 * et les polices via next/font (Source Serif 4 + Public Sans) mappées sur fontFamily.
 *
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cap: {
          navy:    "#0F3D66",
          "navy-700": "#0B2E4D",
          "navy-300": "#14517F",
          accent:  "#F6C445",
          "accent-ink": "#8A6400",
          green:   "#2E9E6B",
          "green-700": "#1F7A52",
          bg:      "#FBFCFD",
          surface: "#FFFFFF",
          "surface-2": "#F4F7FB",
          soft:    "#E7F0F8",
          paper:   "#F6F2EA",
          ink:     "#14202B",
          "ink-muted": "#3C566D",
          muted:   "#5A6B7A",
          border:  "#E6ECF2",
          "border-2": "#EEF2F6",
          "on-navy": "#F6FAFD",
          "on-navy-muted": "#C3D6E8",
          whatsapp: "#25D366",
        },
      },
      fontFamily: {
        display: ['"Source Serif 4"', "Georgia", "serif"],
        body: ['"Public Sans"', "system-ui", "sans-serif"],
      },
      fontSize: {
        // [size, line-height]
        "cap-xs":   ["12px",   { lineHeight: "1.4" }],
        "cap-sm":   ["13.5px", { lineHeight: "1.5" }],
        "cap-base": ["15px",   { lineHeight: "1.55" }],
        "cap-md":   ["16.5px", { lineHeight: "1.6" }],
        "cap-lg":   ["19px",   { lineHeight: "1.55" }],
        "cap-xl":   ["24px",   { lineHeight: "1.3" }],
        "cap-2xl":  ["30px",   { lineHeight: "1.15" }],
        "cap-3xl":  ["40px",   { lineHeight: "1.1" }],
        "cap-4xl":  ["52px",   { lineHeight: "1.05" }],
      },
      letterSpacing: {
        "cap-tight": "-0.8px",
        "cap-wide": "1.4px",
      },
      borderRadius: {
        "cap-sm": "8px",
        "cap-md": "11px",
        "cap-lg": "14px",
        "cap-xl": "18px",
        "cap-2xl": "24px",
        "cap-pill": "100px",
      },
      boxShadow: {
        "cap-sm": "0 1px 2px rgba(20,32,43,.05)",
        "cap-card": "0 1px 2px rgba(20,32,43,.05), 0 24px 50px -28px rgba(15,61,102,.30)",
        "cap-pop": "0 24px 60px -28px rgba(15,61,102,.40)",
        "cap-cta": "0 10px 24px -12px rgba(246,196,69,.90)",
        "cap-modal": "0 40px 90px -30px rgba(0,0,0,.50)",
      },
      backgroundImage: {
        "cap-hero-light": "linear-gradient(170deg, #F6F2EA 0%, #EDF2F7 100%)",
        "cap-hero-navy": "radial-gradient(125% 130% at 82% -10%, #14517F 0%, #0F3D66 48%, #0B2E4D 100%)",
      },
      maxWidth: { "cap-container": "1200px" },
      spacing: { "cap-gutter": "24px" },
    },
  },
  plugins: [],
};
