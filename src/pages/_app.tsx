import '@/styles/globals.css'
import Navigation from "@/comps/Nav/Nav.jsx"
import Footer from "@/comps/Footer/Footer.jsx"

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navigation />
      <Component {...pageProps} className="h-100" />
      <Footer />
    </div>
  )
}
