import Box from '@mui/material/Box'
import { useSelector } from 'react-redux'

import AppHeader from '@/components/organisms/AppHeader/AppHeader'
import './DefaultLayout.css'
import SideBarRight from '../../organisms/SideBarRight/SideBarRight'
import { selectCurrentUser } from '@/redux/userSlice/userSlice'

function DefaultLayout({ children, showSidebar = false }) {
  const currentUser = useSelector(selectCurrentUser)
  return (
    <Box className="default-layout">
      <AppHeader showSidebar={showSidebar} />
      <Box className={`default-layout-content ${!showSidebar ? 'centered' : ''}`}>
        <Box component="main" className="default-layout-main">{children}</Box>
        {showSidebar && currentUser && <SideBarRight />}
      </Box>
    </Box>
  )
}

export default DefaultLayout

