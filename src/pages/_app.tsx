import '@/styles/globals.css'
import Navigation from "@/comps/Nav/Nav.jsx"
import Footer from "@/comps/Footer/Footer.jsx"

import type { AppProps } from 'next/app'

import Box from '@mui/material/Box';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Box>
      <Navigation />
      <Component {...pageProps} sx={{minHeight : "100vh"}}/>
      <Footer />
    </Box>
  )
}
