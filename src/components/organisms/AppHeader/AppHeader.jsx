import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { environment } from '@/utils/environment'

import Text from '@/components/atoms/Text/Text'
import CustomButton from '@/components/atoms/CustomButton/CustomButton'
import ConfirmDialog from '@/components/molecules/ConfirmDialog/ConfirmDialog'
import './AppHeader.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPaw,
  faUser,
  faCog,
  faQuestionCircle,
  faSignOutAlt,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import { selectCurrentUser } from '@/redux/userSlice/userSlice'
import { logoutUserAPI } from '../../../redux/userSlice/userSlice'


function AppHeader() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openConfirm, setOpenConfirm] = useState(false)
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getAvatarSrc = (avatar) => {
    if (!avatar) return ''
    if (avatar.startsWith('http://') || avatar.startsWith('https://')) return avatar
    return `${environment.apiBaseUrl}${avatar}`
  }

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

  const handleLogin = () => {
    navigate('/login')
  }

  const handleSignUp = () => {
    navigate('/signup')
  }

  return (
    <AppBar position="static" className="app-header">
      <Toolbar>
        <Text variant="h6" className="app-header-title">
          <FontAwesomeIcon icon={faPaw} className="app-header-icon" />
          Daily days
        </Text>
        <Box className="app-header-spacer" />
        {currentUser ? (
          <>
            <Avatar
              className="app-header-avatar"
              src={getAvatarSrc(currentUser?.avatar || currentUser?.picture)}
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
              <Box className="menu-header">
                <Avatar
                  className="app-header-avatar"
                  src={getAvatarSrc(currentUser?.avatar || currentUser?.picture)}
                  sx={{ width: 32, height: 32 }}
                />
                <Box className="menu-header-info">
                  <Text className="menu-header-name">
                    {currentUser?.username || currentUser?.name}
                  </Text>
                  <Text className="menu-header-plan">Free</Text>
                </Box>
                <FontAwesomeIcon icon={faChevronRight} className="menu-header-arrow" />
              </Box>

              <Divider />

              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <FontAwesomeIcon icon={faUser} className="menu-icon" />
                </ListItemIcon>
                Profile
                <FontAwesomeIcon icon={faChevronRight} className="menu-item-arrow" />
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <FontAwesomeIcon icon={faCog} className="menu-icon" />
                </ListItemIcon>
                Settings
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <FontAwesomeIcon icon={faQuestionCircle} className="menu-icon" />
                </ListItemIcon>
                Help
                <FontAwesomeIcon icon={faChevronRight} className="menu-item-arrow" />
              </MenuItem>

              <Divider />

              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" />
                </ListItemIcon>
                Log out
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Box className="auth-buttons">
            <CustomButton
              variable="outline"
              onClick={handleLogin}
              className="auth-button-login"
            >
              Login
            </CustomButton>
            <CustomButton
              variable="primary"
              onClick={handleSignUp}
              className="auth-button-signup"
            >
              Sign Up
            </CustomButton>
          </Box>
        )}
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

