import type { Config } from 'tailwindcss';

const config = {
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            boxShadow: {
                'custom': '0px 2px 4px rgba(14, 30, 37, 0.12), 0px 2px 16px rgba(14, 30, 37, 0.32)',
            },
        },
    },
    plugins: [],
} satisfies Config;

export default config;
