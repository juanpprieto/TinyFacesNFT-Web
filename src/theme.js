import { makeTheme } from '@theme-ui/css/utils'

const heading = {
    color: 'text',
    fontFamily: 'heading',
    lineHeight: 'heading',
    fontWeight: 'heading',
}

export const base = makeTheme({
    space: [0, 4, 8, 16, 20, 26, 32, 48, 64, 128, 256, 512],
    fonts: {
        body: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
        heading: 'Migra',
        monospace: 'Menlo, monospace',
    },
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 50, 64, 96],
    fontWeights: {
        body: 300,
        heading: 500,
        bold: 400,
        extraBold: 600,
    },
    breakpoints: ['544px', '768px', '1012px', '1280px'],
    radii: [5, 10, 15, 30],
    lineHeights: {
        body: 1.5,
        heading: 1.125,
    },
    buttons: {
        primary: {
            color: 'background',
            bg: 'secondary',
            borderRadius: ['20px', '20px', '23px'],
            px: [3, 3, 4],
            py: 0,
            fontSize: [1, 1, 2],
            fontWeight: 'heading',
            height: ['40px', '40px', '46px'],
            lineHeight: ['40px', '40px', '46px'],

            '&:hover': {
                bg: 'primary',
            },

            '&:disabled': {
                bg: 'disabled',
            },
        },

        secondary: {
            color: 'text',
            bg: 'transparent',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: 'text',
            borderRadius: ['20px', '20px', '23px'],
            px: [3, 3, 4],
            py: 0,
            fontSize: [1, 1, 2],
            fontWeight: 'heading',
            height: ['40px', '40px', '46px'],
            lineHeight: ['40px', '40px', '46px'],

            '&:hover': {
                borderColor: 'primary',
                color: 'background',
                bg: 'primary',
            },
        },
    },

    colors: {
        text: '#212529',
        textGrey: '#C9C9C9',
        textInversedSoft: '#F4DDBE',
        textInversed: '#FFFFFF',
        backgroundBright: '#FFFFFF',
        background: '#F4F4F2',
        backgroundInversed: '#212529',
        modal: 'RGBA(33,37,41,0.63)',
        backgroundDark: '#142855',
        primary: '#ED4A29',
        secondary: '#212529',
        disabled: '#CFCFCD',
        muted: '#f6f6f6',
        border: '#D4D5D4',
    },
    styles: {
        root: {
            fontFamily: 'body',
            lineHeight: 'body',
            fontWeight: 'body',
        },
        h1: {
            ...heading,
            fontSize: 5,
        },
        h2: {
            ...heading,
            fontSize: 4,
        },
        h3: {
            ...heading,
            fontSize: 3,
        },
        h4: {
            ...heading,
            fontSize: 2,
        },
        h5: {
            ...heading,
            fontSize: 1,
        },
        h6: {
            ...heading,
            fontSize: 0,
        },
        p: {
            color: 'text',
            fontFamily: 'body',
            fontWeight: 'body',
            lineHeight: 'body',
        },
        a: {
            color: 'primary',
        },
        pre: {
            fontFamily: 'monospace',
            overflowX: 'auto',
            code: {
                color: 'inherit',
            },
        },
        code: {
            fontFamily: 'monospace',
            fontSize: 'inherit',
        },
        table: {
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: 0,
        },
        th: {
            textAlign: 'left',
            borderBottomStyle: 'solid',
        },
        td: {
            textAlign: 'left',
            borderBottomStyle: 'solid',
        },
        img: {
            maxWidth: '100%',
        },
    },
})

export default base
