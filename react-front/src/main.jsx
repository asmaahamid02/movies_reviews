import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#023047',
    },
    secondary: {
      main: '#ffb703',
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
