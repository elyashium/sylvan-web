/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E7A4A',
        primaryDark: '#166339',
        primaryLight: '#48A673',
        secondary: '#3D6F6C',
        accent: '#FF9D45',
        success: '#34D399',
        warning: '#FBBF24',
        error: '#F87171',
        info: '#60A5FA',
        bgMain: '#F5F9F7',
        bgCard: '#F0F7EB',
        textPrimary: '#0F1E0C',
        textSecondary: '#4A5C54',
        border: '#E2EAE5',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        'full': '9999px',
      },
    },
  },
  plugins: [],
};