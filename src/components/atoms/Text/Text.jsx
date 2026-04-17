import Typography from '@mui/material/Typography'

/**
 * Atom: 纯展示文本（对外暴露 MUI Typography 的最常用能力）
 */
function Text({ variant = 'body1', ...props }) {
  return <Typography variant={variant} {...props} />
}

export default Text

