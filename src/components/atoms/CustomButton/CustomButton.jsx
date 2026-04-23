import { memo } from 'react'
import Button from '@mui/material/Button'

/**
 * Atom: 项目统一按钮（目前封装 MUI Button）
 */
function CustomButton({ variable = 'primary', sx, ...props }) {
  const baseStyle = {
    textAlign: 'center',
    justifyContent: 'center'
  }

  let buttonVariant = 'contained'
  let variableStyle = {}

  switch (variable) {
    case 'outline':
      buttonVariant = 'outlined'
      variableStyle = {
        borderColor: 'var(--app-border-color)',
        color: 'inherit',
        '&:hover': {
          borderColor: 'var(--app-border-color)'
        }
      }
      break
    case 'primary':
    default:
      variableStyle = {
        backgroundColor: 'var(--app-button-color)',
        color: '#fff',
        '&:hover': {
          backgroundColor: 'var(--app-button-color-hover)'
        }
      }
  }

  return (
    <Button
      variant={buttonVariant}
      sx={{
        ...baseStyle,
        ...variableStyle,
        ...sx,
        textTransform: 'unset'
      }}
      {...props}
    />
  )
}

export default memo(CustomButton)
