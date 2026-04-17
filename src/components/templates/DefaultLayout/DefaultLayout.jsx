import Box from '@mui/material/Box'

import AppHeader from '@/components/organisms/AppHeader/AppHeader'

/**
 * Template: 页面通用布局（Header + 内容区）
 */
function DefaultLayout({ children }) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppHeader />
      <Box component="main">{children}</Box>
    </Box>
  )
}

export default DefaultLayout

