export const content = ["./main/route/**/*.html"];
export const theme = {
    extend: {
        keyframes: {
        marquee: {
            '0%': { transform: 'translateX(100%)' },
            '100%': { transform: 'translateX(-100%)' },
        },
        },
        animation: {
        marquee: 'marquee 10s linear infinite',
        },
        fontFamily: {
            sans: ['Jakarta Sans', 'Poppins', 'Open Sans', sans-serif],
        },
    },
};
export const plugins = [];