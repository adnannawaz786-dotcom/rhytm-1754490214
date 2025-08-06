import '../styles/globals.css'
import Layout from '../components/Layout'
import { ThemeProvider } from '../contexts/ThemeContext'
import { PlayerProvider } from '../contexts/PlayerContext'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <PlayerProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PlayerProvider>
    </ThemeProvider>
  )
}