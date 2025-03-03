'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
  },
  typography: {
    fontFamily: 'var(--font-geist)',
  },
});

export default theme;