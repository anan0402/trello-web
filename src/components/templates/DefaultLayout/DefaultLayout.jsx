import Box from '@mui/material/Box'

import AppHeader from '@/components/organisms/AppHeader/AppHeader'
import './DefaultLayout.css'
import SideBarRight from '../../organisms/SideBarRight/SideBarRight'

function DefaultLayout({ children, showSidebar = false }) {
  return (
    <Box className="default-layout">
      <AppHeader showSidebar={showSidebar} />
      <Box className={`default-layout-content ${!showSidebar ? 'centered' : ''}`}>
        <Box component="main" className="default-layout-main">{children}</Box>
        {showSidebar && <SideBarRight />}
      </Box>
    </Box>
  )
}

export default DefaultLayout

