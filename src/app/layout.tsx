import type React from "react"
import "./globals.css"
import CssBaseline from "@mui/material/CssBaseline"

// Import Roboto font
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { ThemeProvider } from "../components/theme-provider"
import { AuthProvider } from "../hook/use-auth"

// const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="he" dir="rtl">
      <body>
         {/* className={inter.className}> */}
        <ThemeProvider>
          <CssBaseline />
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
