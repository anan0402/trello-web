import { Columns, MoonIcon, SunIcon } from "lucide-react"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeThemeMode } from "../../redux/slices/headerSlice"
import { getThemeIcon, toggleTheme } from "../../theme"
import Button from "../atoms/Button"
import Text from "../atoms/Text"

function Header() {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.headerReducer.themeMode)
  const handleToggleTheme = () => {
    toggleTheme()
    const currentTheme = getThemeIcon()
    dispatch(changeThemeMode(currentTheme))
  }
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between p-6 border-b">
      <div className="flex items-end gap-3">
        <Columns height={20} width={20} />
        <Text as='p'>Trello Web</Text>
      </div>
      <Button
        onClick={handleToggleTheme}
        className="w-12 h-12 flex items-center justify-center"
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </Button>
    </header>
  )
}

export default React.memo(Header)


