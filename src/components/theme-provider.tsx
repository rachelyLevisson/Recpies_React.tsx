"use client"
import type React from "react"
import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material/styles"
import { prefixer } from "stylis"
import rtlPlugin from "stylis-plugin-rtl"
import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
})

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: ["Roboto", "Arial", "sans-serif"].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={cacheRtl}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </CacheProvider>
  )
}
