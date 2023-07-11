/** @type {import('tailwindcss').Config} */
import { colors, spacing } from 'tailwindcss/defaultTheme';

const customSpacings = {
    ...spacing,
    '[calc(100vh-100px)]': 'calc(100vh - 100px)',
    '15px': '15px',
    '17px': '17px',
    '11px': '11px',
    '2.5': '0.625rem',
    '11': '2.75rem',
    '11.5': '2.85rem',
    '28': '7rem',
    '50': '12.5rem',
    '9': '2.25rem',
    '14': '3.5rem',
    '68': '18rem',
    '72': '20rem',
    '96': '24rem',
    '112': '28rem',
    '7': '1.625rem',
}

module.exports = {
    important: true,
    content: [],
    theme: {
        extend: {
            minHeight: customSpacings,
            maxHeight: customSpacings,
            minWidth: customSpacings,
            maxWidth: {
                ...customSpacings,
                'screen': '100vw'
            },
            spacing: {
                ...customSpacings,
                '[520px]': '520px',
                '1/2': '50%',
                'xs': '4px',
                'sm': '11px',
                'md': '17px',
                'lg': '28px',
                'xl': '46px',
                '9': '2.25rem',
                '10': '2.5rem',
                '5.5': '1.375rem',
                '6': '1.5rem'
            },
            height: {
                '7': '1.625rem',
                ...customSpacings
            },
            fontSize: {
                '2xs': '.75rem', //12
                'xs': '.875rem', //14
                'sm': '.9375rem', // 15
                'base': '1.0625rem', // 17
                'md': '1.125rem', // 18
                'lg': '1.1875rem', // 19
                'xl': '1.31rem', //21
                '2xl': '1.5rem', // 24
                '3xl': '1.75rem', // 28
                '4xl': '2rem', // 32
                '5xl': '2.25rem', // 36
                '6xl': '2.5rem', // 40
                '7xl': '2.75rem', // 44
                '8xl': '3rem', // 48
            },
            colors: {
                'primary': '#F16B25',
                green: {
                    ...colors.green,
                    '100': '#83ECCB',
                    '400': '#68d391'
                },
                teal: {
                    '300': '#3CE2AE',
                },
                red: {
                    '300': '#e74439',
                    '400': '#F2607B',
                    '600': '#e53e3e',
                    'faded': 'rgba(183, 12, 12, 0.7)'
                },
                yellow: {
                    '600': '#E1BD57',
                },
                zink: {
                    ...colors.zink,
                    '200': '#E4E4E7',
                },
                gray: {
                    ...colors.gray,
                    '50': '#F9FAFE',
                    '75': '#EBEDF4',
                    '100': '#D6DDE2',
                    '150': '#EFF0F6',
                    '200': '#F5F6FA',
                    '300': '#EDF0F7',
                    '400': '#748AA1',
                    '500': '#C3C6D1',
                    '600': '#D4D4D4',
                    '700': '#858997',
                    '800': '#31394D',
                    '900': '#E7ECF0'
                },
                blue: {
                    ...colors.blue,
                    '100': '#8E9BB0',
                    '200': '#5B8FF3',
                    '300': '#679CF6',
                    '350': '#408BF9',
                    '400': '#354A6F',
                    '425': '#3777D6',
                    '500': '#4072EE',
                    '600': '#279489'
                }
            },
        },
        screens: {
            '2xs': '375px',
            'xs': '540px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1440px',
            '3xl': '1660px'
        },
    },
    plugins: [],
}

