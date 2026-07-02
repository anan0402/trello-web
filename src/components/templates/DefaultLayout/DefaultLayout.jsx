import Box from '@mui/material/Box'

import AppHeader from '@/components/organisms/AppHeader/AppHeader'
import './DefaultLayout.css'
import SideBarRight from '../../organisms/SideBarRight/SideBarRight'

// Mock friends data - replace with real API call
const mockFriends = [
  {
    _id: '1',
    username: 'DAISY',
    avatar: null,
    online: true
  },
  {
    _id: '2',
    username: 'John Doe',
    avatar: null,
    online: true
  },
  {
    _id: '3',
    username: 'Jane Smith',
    avatar: null,
    online: false
  },
  {
    _id: '4',
    username: 'Mike Wilson',
    avatar: null,
    online: true
  },
  {
    _id: '5',
    username: 'Sarah Johnson',
    avatar: null,
    online: false
  },
  {
    _id: '6',
    username: 'Alex Brown',
    avatar: null,
    online: true
  }
]

function DefaultLayout({ children }) {
  return (
    <Box className="default-layout">
      <AppHeader />
      <Box className="default-layout-content">
        <Box component="main" className="default-layout-main">{children}</Box>
        <SideBarRight friends={mockFriends} />
      </Box>
    </Box>
  )
}

export default DefaultLayout

