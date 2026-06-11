import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import Text from '@/components/atoms/Text/Text'
import ConfirmDialog from '@/components/molecules/ConfirmDialog/ConfirmDialog'
import './AppHeader.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw } from '@fortawesome/free-solid-svg-icons'
import { selectCurrentUser } from '@/redux/userSlice/userSlice'
import { logoutUserAPI } from '../../../redux/userSlice/userSlice'


function AppHeader() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openConfirm, setOpenConfirm] = useState(false)
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  const handleOpen = (e) => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const handleLogout = () => {
    handleClose()
    setOpenConfirm(true)
  }

  const handleConfirmLogout = () => {
    setOpenConfirm(false)
    // TODO: Call logout API
    dispatch(logoutUserAPI())
    
  }

  console.log('Current user in AppHeader:', currentUser)

  return (
    <AppBar position="static" className="app-header">
      <Toolbar>
        <Text variant="h6" className="app-header-title">
          <FontAwesomeIcon icon={faPaw} className="app-header-icon" />
          Daily days
        </Text>
        <Box className="app-header-spacer" />
        <Avatar
          className="app-header-avatar"
          src={currentUser?.avatar || currentUser?.picture}
          alt={currentUser?.username || currentUser?.name}
          onClick={handleOpen}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          className="app-menu-item"
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
        <ConfirmDialog
          open={openConfirm}
          title="Xác nhận đăng xuất"
          message="Bạn chắc chắn muốn đăng xuất?"
          confirmText="Đăng xuất"
          cancelText="Hủy"
          onConfirm={handleConfirmLogout}
          onCancel={() => setOpenConfirm(false)}
        />
      </Toolbar>
    </AppBar>
  )
}

export default AppHeader

