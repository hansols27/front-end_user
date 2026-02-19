'use client';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,    // 모바일 기준
      md: 768,
      lg: 1024,
      xl: 1920,   // PC 기준
    },
  },
});