import Button from '@mui/material/Button'

/**
 * Atom: 项目统一按钮（目前封装 MUI Button）
 */
function TrelloButton({ variant = 'contained', ...props }) {
  return <Button variant={variant} {...props} />
}

export default TrelloButton

