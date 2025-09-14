// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    // Use 'extend' to add your custom theme, fonts, etc.
    theme: {
        extend: {
            colors: {
                'primary-500': 'oklch(0.66 0.16 261.27)', // Custom color
            },
            fontFamily: {
                display: ['Poppins', 'sans-serif'], // Custom font family
            },
        },
    },
    plugins: [
        // Plugins Here
    ],
};