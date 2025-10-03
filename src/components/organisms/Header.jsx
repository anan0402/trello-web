import { BellIcon, Columns, MoonIcon, SunIcon } from "lucide-react"
import React, { useCallback, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { changeThemeMode } from "../../redux/slices/headerSlice"
import { getThemeIcon, toggleTheme } from "../../theme"
import Avatar from "../atoms/Avatar"
import Button from "../atoms/Button"
import AccountMenu from "../menus/AccountMenu"
import NotificationMenu from "../menus/NotificationMenu"
import Popup from "../molecules/Popup"
import SearchBar from "../molecules/SearchBar"
import HeaderCreatedButtonMenu from "../menus/HeaderCreatedButtonMenu"

function Header() {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.headerReducer.themeMode)
  const navigate = useNavigate()

  const [isAccountPopupOpen, setIsAccountPopupOpen] = useState(false)
  const [isCreatedButtonPopupOpen, setIsCreatedButtonPopupOpen] = useState(false)
  const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(false)
  const avatarRef = useRef(null)
  const createdButtonRef = useRef(null)
  const notificationRef = useRef(null)

  // Mock user data - replace with real user data from your auth system
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '' // Add image URL here
  }

  const handleNavigate = useCallback(() => {
    navigate('/')
  }, [navigate])

  const handleToggleTheme = useCallback(() => {
    toggleTheme()
    const currentTheme = getThemeIcon()
    dispatch(changeThemeMode(currentTheme))
  }, [])

  const handleCloseAccountPopup = useCallback(() => {
    setIsAccountPopupOpen(false)
  }, [])

  const handleAvatarClick = useCallback(() => {
    setIsAccountPopupOpen(prev => !prev)
  }, [])

  const handleSearch = useCallback((value) => {
    console.log(value)
  }, [])

  const handleCreatedButtonClick = useCallback(() => {
    setIsCreatedButtonPopupOpen(prev => !prev)
  }, [])

  const handleCloseCreatedButtonPopup = useCallback(() => {
    setIsCreatedButtonPopupOpen(false)
  }, [])

  const handleNotificationClick = useCallback(() => {
    setIsNotificationPopupOpen(prev => !prev)
  }, [])

  const handleCloseNotificationPopup = useCallback(() => {
    setIsNotificationPopupOpen(false)
  }, [])

  return (
    <header className="h-25 sticky top-0 z-10 flex items-center justify-between px-6 py-5 border-b gap-4">
      <div
        className="flex items-center justify-center gap-4 cursor-pointer"
        onClick={handleNavigate}
      >
        <Columns height={20} width={20} />
        <span className="text-[2rem] font-bold">Trello Web</span>
      </div>
      <div className="h-full flex items-center gap-4 relative">
        <SearchBar onSearch={handleSearch} className="w-[40rem]" />
        <Button onClick={handleCreatedButtonClick} ref={createdButtonRef}>Create</Button>
        <Popup
          isOpen={isCreatedButtonPopupOpen}
          onClose={handleCloseCreatedButtonPopup}
          position="bottom"
          triggerRef={createdButtonRef}
          className="right-0"
        >
          <HeaderCreatedButtonMenu />
        </Popup>
      </div>
      <div className="flex items-center gap-5 h-full">
        <div
          onClick={handleToggleTheme}
          
        >
          {theme === 'dark' ? <SunIcon size={20} /> : <MoonIcon size={20} />}
        </div>

        <div
          ref={notificationRef}
          onClick={handleNotificationClick}
          className="cursor-pointer hover:bg-gray-200/70 focus:bg-gray-200/70 rounded-md p-2 relative"
        >
          <BellIcon size={20} className="color-gray-900" />
          <Popup
            isOpen={isNotificationPopupOpen}
            onClose={handleCloseNotificationPopup}
            position="bottom"
            triggerRef={notificationRef}
            className="right-0"
          >
            <NotificationMenu
              onClose={handleCloseNotificationPopup}
            />
          </Popup>
        </div>

        <div ref={avatarRef} className="relative">
          <Avatar
            src={user.avatar}
            alt={user.name}
            size="lg"
            onClick={handleAvatarClick}
          />
          <Popup
            isOpen={isAccountPopupOpen}
            onClose={handleCloseAccountPopup}
            position="bottom"
            triggerRef={avatarRef}
            className="right-0"
          >
            <AccountMenu
              user={user}
              onClose={handleCloseAccountPopup}
            />
          </Popup>
        </div>
      </div>
    </header>
  )
}

export default React.memo(Header)


