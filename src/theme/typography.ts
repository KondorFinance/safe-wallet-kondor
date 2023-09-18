import type { TypographyOptions } from '@mui/material/styles/createTypography'

declare module '@mui/material/styles' {
  interface TypographyVariants {
    logo: React.CSSProperties
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    logo?: React.CSSProperties
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    logo: true
  }
}

const typography: TypographyOptions = {
  fontFamily: 'DM Sans, sans-serif',
  logo: {
    fontSize: '16px',
    lineHeight: '22px',
    fontWeight: 400,
    fontFamily: 'Roboto Mono, sans-serif',
  },
  h1: {
    fontSize: '32px',
    lineHeight: '36px',
    fontWeight: 700,
  },
  h2: {
    fontSize: '27px',
    lineHeight: '34px',
    fontWeight: 700,
  },
  h3: {
    fontSize: '24px',
    lineHeight: '30px',
  },
  h4: {
    fontSize: '20px',
    lineHeight: '26px',
  },
  h5: {
    fontSize: '16px',
    fontWeight: 700,
  },
  body1: {
    fontSize: '16px',
    lineHeight: '22px',
  },
  body2: {
    fontSize: '14px',
    lineHeight: '20px',
  },
  caption: {
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '0.4px',
  },
  overline: {
    fontSize: '11px',
    lineHeight: '14px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
}

export default typography
