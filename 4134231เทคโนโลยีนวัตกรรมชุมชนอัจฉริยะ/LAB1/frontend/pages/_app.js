import * as React from 'react'
import Head from 'next/head'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import '../styles/globals.css'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import NavDrawer from '../components/NavDrawer'

const theme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  },
})

export default function MyApp({ Component, pageProps }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AppBar position="sticky">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              LAB1 Mobile
            </Typography>
          </Toolbar>
        </AppBar>

        <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
