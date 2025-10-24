/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Custom brand color palette based on provided colors
        primary: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#fdd338', // Main brand yellow
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
        secondary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#e11a2b', // Main brand red
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        tertiary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#1C6FE3', // Main brand blue
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#000000', // Pure black
        },
        white: '#FFFFFF',
        black: '#000000',
        // Status colors using brand palette
        status: {
          info: '#1C6FE3',
          success: '#16A34A',
          warning: '#fdd338',
          danger: '#e11a2b',
        },
        footer: '#000000',
      },
      fontFamily: {
        // Ananta typography system
        heading: ['Poppins', 'Montserrat', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Poppins', 'Montserrat', 'Inter', 'system-ui', 'sans-serif'],
        numeric: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Ananta Typography Scale (Updated to match design guidelines)
        h1: ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }], // 56px desktop
        h2: ['2.25rem', { lineHeight: '1.15' }], // 36px desktop
        h3: ['1.75rem', { lineHeight: '1.2' }], // 28px desktop
        h4: ['1.375rem', { lineHeight: '1.25' }], // 22px desktop
        subhead: ['1rem', { lineHeight: '1.6' }], // 16px desktop
        'subhead-mobile': ['0.9375rem', { lineHeight: '1.6' }], // 15px mobile
        nav: ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.08em', textTransform: 'uppercase' }], // 13px
        'body-lg': ['1.125rem', { lineHeight: '1.6' }], // 18px
        body: ['1rem', { lineHeight: '1.65' }], // 16px
        caption: ['0.875rem', { lineHeight: '1.5' }], // 14px
        overline: [
          '0.75rem',
          { lineHeight: '1.5', letterSpacing: '0.08em', textTransform: 'uppercase' },
        ], // 12px
        // Mobile responsive sizes
        'h1-mobile': ['2.125rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }], // 34px mobile
        'h2-mobile': ['1.75rem', { lineHeight: '1.15' }], // 28px mobile
        'h3-mobile': ['1.375rem', { lineHeight: '1.2' }], // 22px mobile
        'h4-mobile': ['1.125rem', { lineHeight: '1.25' }], // 18px mobile
        // Legacy sizes for compatibility
        display: ['4.5rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
        hero: ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        section: ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
      },
      spacing: {
        // Ananta spacing scale: [4, 8, 12, 16, 24, 32, 48, 64, 96]px
        1: '0.25rem', // 4px
        2: '0.5rem', // 8px
        3: '0.75rem', // 12px
        4: '1rem', // 16px
        6: '1.5rem', // 24px
        8: '2rem', // 32px
        12: '3rem', // 48px
        16: '4rem', // 64px
        24: '6rem', // 96px
        // Additional custom spacing
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
      animation: {
        // Ananta animation system: 200-400ms duration, ease-out easing
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'fade-in-slow': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'slide-up-slow': 'slideUp 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
        // New Ananta-style animations
        'zoom-hover': 'zoomHover 0.2s ease-out forwards',
        'brightness-hover': 'brightnessHover 0.2s ease-out forwards',
        'translate-hover': 'translateHover 0.2s ease-out forwards',
        'zoom-in': 'zoomIn 8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        // Ananta-style hover animations
        zoomHover: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        brightnessHover: {
          '0%': { filter: 'brightness(1)' },
          '100%': { filter: 'brightness(0.95)' },
        },
        translateHover: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-2px)' },
        },
        zoomIn: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      // Ananta component system
      borderRadius: {
        none: '0',
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '24px',
        round: '999px',
      },
      boxShadow: {
        soft: '0 8px 24px rgba(0,0,0,0.08)',
        medium: '0 12px 32px rgba(0,0,0,0.12)',
        hard: '0 2px 0 rgba(0,0,0,0.06)',
      },
      maxWidth: {
        ananta: '1200px', // Ananta max width
      },
      screens: {
        xs: '360px',
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
};
