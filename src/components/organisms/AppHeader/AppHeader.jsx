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
import CustomAutocompleteSearchBox from '@/components/atoms/CustomAutocompleteSearchBox'
import ConfirmDialog from '@/components/molecules/ConfirmDialog/ConfirmDialog'
import { search } from '@/services/search.service'
import './AppHeader.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPaw,
  faUser,
  faCog,
  faQuestionCircle,
  faSignOutAlt,
  faChevronRight,
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import { selectCurrentUser } from '@/redux/userSlice/userSlice'
import { logoutUserAPI } from '../../../redux/userSlice/userSlice'


function AppHeader() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [openSearchDrawer, setOpenSearchDrawer] = useState(false)
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

  const handleSearchFetch = async (query) => {
    try {
      const results = await search(query)
      return results
    } catch (error) {
      console.error('Search error:', error)
      return []
    }
  }

  const handleSearchSelect = (selectedItem) => {
    console.log('Selected item:', selectedItem)
    setOpenSearchDrawer(false)
    // TODO: Navigate to selected item or perform action
  }

  const handleToggleSearchDrawer = () => {
    setOpenSearchDrawer(!openSearchDrawer)
  }

  return (
    <AppBar position="static" className="app-header">
      <Toolbar className="app-tool-bar">
        <div className="app-header-left">
          <Text variant="h6" className="app-header-title">
            <FontAwesomeIcon icon={faPaw} className="app-header-icon" />
            <div className="search-box-desktop">Daily days</div>
          </Text>
          <div className="search-box-desktop">
            <CustomAutocompleteSearchBox
              isSearchApi={true}
              fetchOptions={handleSearchFetch}
              onSelect={handleSearchSelect}
              placeholder="Tìm kiếm..."
              getOptionLabel={(option) => option?.name || option?.label || ''}
            />
          </div>
           <IconButton
          className="search-icon-mobile"
          onClick={handleToggleSearchDrawer}
          sx={{ color: 'var(--app-text-color)' }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </IconButton>
        </div>

        <Box className="app-header-spacer" />

       

        <Box sx={{ width: '24px' }} />
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

      <Drawer
        anchor="right"
        open={openSearchDrawer}
        onClose={() => setOpenSearchDrawer(false)}
        className="search-drawer"
      >
        <Box className="search-drawer-content">
          <Box className="search-drawer-header">
            <Text variant="h6" className="search-drawer-title">
              Tìm kiếm
            </Text>
            <IconButton
              onClick={() => setOpenSearchDrawer(false)}
              sx={{ color: 'var(--app-text-color)' }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </IconButton>
          </Box>
          <Box className="search-drawer-body">
            <CustomAutocompleteSearchBox
              isSearchApi={true}
              fetchOptions={handleSearchFetch}
              onSelect={handleSearchSelect}
              placeholder="Tìm kiếm..."
              getOptionLabel={(option) => option?.name || option?.label || ''}
            />
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  )
}

export default AppHeader

