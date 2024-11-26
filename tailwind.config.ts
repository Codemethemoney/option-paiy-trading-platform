import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    extend: {
      colors: {
        // Primary Palette
        primary: {
          start: "#4F46E5",
          end: "#6366F1",
          hover: {
            start: "#4338CA",
            end: "#4F46E5"
          },
          active: {
            start: "#3730A3",
            end: "#4338CA"
          }
        },
        secondary: {
          start: "#EC4899",
          end: "#F472B6",
          hover: {
            start: "#DB2777",
            end: "#EC4899"
          },
          active: {
            start: "#BE185D",
            end: "#DB2777"
          }
        },
        success: {
          start: "#10B981",
          end: "#34D399",
          hover: {
            start: "#059669",
            end: "#10B981"
          },
          active: {
            start: "#047857",
            end: "#059669"
          }
        },
        warning: {
          start: "#F59E0B",
          end: "#FBBF24",
          hover: {
            start: "#D97706",
            end: "#F59E0B"
          },
          active: {
            start: "#B45309",
            end: "#D97706"
          }
        },
        danger: {
          start: "#EF4444",
          end: "#F87171",
          hover: {
            start: "#DC2626",
            end: "#EF4444"
          },
          active: {
            start: "#B91C1C",
            end: "#DC2626"
          }
        },
        // Accent Colors
        accent: {
          blue: {
            start: "#3B82F6",
            end: "#60A5FA"
          },
          purple: {
            start: "#8B5CF6",
            end: "#A78BFA"
          },
          teal: {
            start: "#14B8A6",
            end: "#2DD4BF"
          },
          orange: {
            start: "#F97316",
            end: "#FB923C"
          },
          rose: {
            start: "#E11D48",
            end: "#FB7185"
          }
        },
        // Text Colors
        text: {
          primary: "#111827",
          secondary: "#374151",
          tertiary: "#6B7280",
          disabled: "#9CA3AF"
        }
      },
      fontFamily: {
        primary: ["Inter var", "system-ui", "sans-serif"],
        secondary: ["SF Pro Display", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      fontSize: {
        display: ["3.815rem", { lineHeight: "1.2" }],
        h1: ["3.052rem", { lineHeight: "1.2" }],
        h2: ["2.441rem", { lineHeight: "1.2" }],
        h3: ["1.953rem", { lineHeight: "1.3" }],
        h4: ["1.563rem", { lineHeight: "1.4" }],
        h5: ["1.25rem", { lineHeight: "1.5" }],
        body: ["1rem", { lineHeight: "1.6" }],
        small: ["0.8rem", { lineHeight: "1.5" }],
        tiny: ["0.64rem", { lineHeight: "1.4" }]
      },
      fontWeight: {
        thin: "100",
        light: "300",
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900"
      },
      spacing: {
        "2xs": "0.25rem",
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem",
        "4xl": "6rem"
      },
      borderRadius: {
        none: "0",
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px"
      },
      boxShadow: {
        level1: "0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.06)",
        level2: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        level3: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        level4: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        level5: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      },
      zIndex: {
        base: "0",
        float: "10",
        dropdown: "20",
        sticky: "30",
        fixed: "40",
        modalBackdrop: "50",
        modal: "60",
        popover: "70",
        tooltip: "80",
        toast: "90"
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
        fadeOut: "fadeOut 0.3s ease-in-out",
        bounce: "bounce 0.5s infinite",
        shake: "shake 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
