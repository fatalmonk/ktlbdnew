/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      /* --------------------------------------------------------------
       *  BRAND COLORS — KTL Corporate Palette
       * -------------------------------------------------------------- */
      colors: {
        primary: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#fdd338", // Core brand yellow
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#e11a2b", // Core brand red
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        accent: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#1C6FE3", // Core brand blue
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },

        status: {
          info: "#1C6FE3",
          success: "#16A34A",
          warning: "#fdd338",
          danger: "#e11a2b",
        },
        // shadcn/ui CSS variables
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },

      /* --------------------------------------------------------------
       *  TYPOGRAPHY — Clean Corporate Scale (8 sizes only)
       * -------------------------------------------------------------- */
      fontFamily: {
        heading: ["Poppins", "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        glacial: ['"Glacial Indifference"', "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        h1: ["6rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }], // 60px
        h2: ["4.5rem", { lineHeight: "1.15" }], // 45px
        h3: ["3.5rem", { lineHeight: "1.2" }], // 35px
        h4: ["2.5rem", { lineHeight: "1.3" }], // 25px

        body: ["1.8rem", { lineHeight: "1.7" }], // 18px
        "body-lg": ["2.16rem", { lineHeight: "1.6" }], // 21.6px
        caption: ["1.6rem", { lineHeight: "1.5" }], // 16px

        overline: [
          "1.4rem",
          {
            lineHeight: "1.5",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          },
        ],
      },

      /* --------------------------------------------------------------
       *  SPACING — KTL Corporate Scale
       * -------------------------------------------------------------- */
      spacing: {
        1: "0.25rem", // 4
        2: "0.5rem", // 8
        3: "0.75rem", // 12
        4: "1rem", // 16
        6: "1.5rem", // 24
        8: "2rem", // 32
        12: "3rem", // 48
        16: "4rem", // 64
        24: "6rem", // 96
      },

      /* --------------------------------------------------------------
       *  COMPONENT TOKENS — The only shadows/radii you need
       * -------------------------------------------------------------- */
      borderRadius: {
        DEFAULT: "var(--radius)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "999px",
      },

      boxShadow: {
        1: "0 2px 6px rgba(0,0,0,0.06)",
        2: "0 4px 12px rgba(0,0,0,0.08)",
        3: "0 8px 24px rgba(0,0,0,0.12)",
      },

      maxWidth: {
        ktl: "1200px",
      },

      /* --------------------------------------------------------------
       *  ANIMATION — Minimal, reusable, corporate-friendly
       * -------------------------------------------------------------- */
      animation: {
        fade: "fade 0.3s ease-out",
        slide: "slide 0.35s ease-out",
        scale: "scale 0.25s ease-out",
        "announcement-marquee": "announcement-marquee 42s linear infinite",
      },
      keyframes: {
        fade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slide: {
          "0%": { opacity: 0, transform: "translateY(18px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        scale: {
          "0%": { opacity: 0, transform: "scale(0.96)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        "announcement-marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },

      /* --------------------------------------------------------------
       *  RESPONSIVE BREAKPOINTS
       * -------------------------------------------------------------- */
      screens: {
        xs: "360px",
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};
