import type { Config } from 'tailwindcss';

/**
 * نظام تصميم ستائر الياقوت — Al-Yaqoot Design System
 * مستلهم من هوية العلامة: الأحمر الياقوتي + الفضي + العاجي مع لمسة ذهبية هادئة.
 */
const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // الأحمر الياقوتي — Ruby (primary brand color)
        ruby: {
          50: '#fdf2f4',
          100: '#fce7eb',
          200: '#f9d0d9',
          300: '#f3a9ba',
          400: '#ea7795',
          500: '#dc4a72',
          600: '#c52c58',
          700: '#a51f46',
          800: '#8a1b3d', // ★ DEFAULT brand ruby
          900: '#751b38',
          950: '#410a1b',
          DEFAULT: '#8a1b3d',
        },
        // الفضي / البلاتيني — Silver / Platinum
        platinum: {
          50: '#f8f8f9',
          100: '#f1f1f3',
          200: '#e4e4e8',
          300: '#cfcfd6',
          400: '#b0b0bb',
          500: '#9092a0',
          600: '#747687',
          700: '#5f6070',
          800: '#51525e',
          900: '#46474f',
          950: '#2b2b30',
          DEFAULT: '#b0b0bb',
        },
        // الذهب الهادئ — Champagne gold accent
        champagne: {
          50: '#fbf8f1',
          100: '#f5edda',
          200: '#ead8b3',
          300: '#dcbd84',
          400: '#d0a35e', // ★ DEFAULT accent
          500: '#c68c44',
          600: '#b0723a',
          700: '#925732',
          800: '#78472f',
          900: '#643c2a',
          DEFAULT: '#d0a35e',
        },
        // العاجي / الكريمي — Ivory backgrounds
        ivory: {
          DEFAULT: '#f7f4ef',
          soft: '#fbf9f5',
          deep: '#efeae1',
        },
        // الفحمي — Ink (text / dark surfaces)
        ink: {
          DEFAULT: '#1a1718',
          soft: '#2a2527',
          muted: '#6b6366',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'], // Aref Ruqaa — عناوين فخمة
        arabic: ['var(--font-arabic)', 'sans-serif'], // Tajawal — نص عربي
        serif: ['var(--font-serif)', 'serif'], // Cormorant Garamond — لاتيني فخم
        sans: ['var(--font-sans)', 'sans-serif'], // Inter — لاتيني نص
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        luxe: '0 20px 60px -15px rgba(138, 27, 61, 0.25)',
        soft: '0 10px 40px -12px rgba(26, 23, 24, 0.18)',
        gold: '0 0 0 1px rgba(208, 163, 94, 0.4), 0 12px 30px -10px rgba(208,163,94,0.35)',
      },
      backgroundImage: {
        'ruby-gradient': 'linear-gradient(135deg, #a51f46 0%, #8a1b3d 45%, #5b1228 100%)',
        'gold-line': 'linear-gradient(90deg, transparent, #d0a35e, transparent)',
        'silver-sheen':
          'linear-gradient(110deg, #e4e4e8 0%, #f8f8f9 25%, #cfcfd6 50%, #f8f8f9 75%, #e4e4e8 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        sway: {
          '0%,100%': { transform: 'skewX(0deg) translateX(0)' },
          '50%': { transform: 'skewX(-1.2deg) translateX(-4px)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both',
        shimmer: 'shimmer 2.5s linear infinite',
        sway: 'sway 6s ease-in-out infinite',
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
