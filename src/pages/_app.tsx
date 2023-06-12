import '@/styles/globals.css'
import Navigation from "@/comps/Nav/Nav.jsx"
import Footer from "@/comps/Footer/Footer.jsx"

import { ParallaxProvider } from 'react-scroll-parallax'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ParallaxProvider scrollAxis='vertical'>

    <div>
      <Navigation />
      <Component {...pageProps} className = ""/>
      <Footer />
    </div>
    </ParallaxProvider>
  )
}
