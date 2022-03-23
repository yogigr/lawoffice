const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.js',
    ],

    theme: {
        extend: {
            colors: {
                'primary': {
                    50: '#fee6e6',
                    100: '#fecece',
                    200: '#feb5b5',
                    300: '#fe9d9d',
                    400: '#fe6c6c',
                    500: '#fe3a3a',
                    600: '#fe0a0a',
                    700: '#cb0808',
                    800: '#980606',
                    900: '#650404',
                },
            },
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
