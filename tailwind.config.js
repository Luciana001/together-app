const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/laravel/jetstream/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        extend: {
            gradients: {
                'degrade': ['to bottom', '#06b6d4', 'rgba(66, 153, 225, 0.7)', 'rgba(92, 39, 251, 0.7)', '#8C3AFF', '#8C3AFF'] ,
                
            },
            colors: {
                'cyan-800':'#155e75',
                'cyan-700': '#0e7490',
                'cyan':'#478DB3',
                'cyan-100': '#cffafe',
                'cyan-50': '#ecfeff',
                'teal': '#6FB7B6',
                'emerald-500': '#10b981',
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
