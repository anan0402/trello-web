import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import Text from '@/components/atoms/Text/Text'

/**
 * Organism: 顶部导航栏（目前只是示例）
 */
function AppHeader() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Text variant="h6" sx={{ fontWeight: 700 }}>
          Trello Web
        </Text>
      </Toolbar>
    </AppBar>
  )
}

export default AppHeader

