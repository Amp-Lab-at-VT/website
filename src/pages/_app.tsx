import '@/styles/globals.css'
import Navigation from "@/comps/Nav/Nav.jsx"
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  // This will throw error on build time, but it's not a problem
  // @ts-expect-error
  let theme = Component.theme || undefined;
  return (
    <div>
      <ThemeProvider forcedTheme={theme} attribute="class">
        <Navigation />
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  )
}