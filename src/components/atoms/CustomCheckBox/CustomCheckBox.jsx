import Checkbox from '@mui/material/Checkbox'

function CustomCheckBox({ sx, ...props }) {
  return (
    <Checkbox
      sx={{
        color: 'var(--app-border-color)',
        '&.Mui-checked': {
          color: 'var(--app-checkbox-checked-bg)'
        },
        ...sx
      }}
      {...props}
    />
  )
}

export default CustomCheckBox
