import Box from '@mui/material/Box'

import AppHeader from '@/components/organisms/AppHeader/AppHeader'
import './DefaultLayout.css'

function DefaultLayout({ children }) {
  return (
    <Box className="default-layout">
      <AppHeader />
      <Box component="main" className="default-layout-main">{children}</Box>
    </Box>
  )
}

export default DefaultLayout

