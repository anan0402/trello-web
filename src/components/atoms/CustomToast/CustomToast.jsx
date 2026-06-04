import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faExclamation,
  faInfo,
  faXmark
} from '@fortawesome/free-solid-svg-icons'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import { memo } from 'react'

import './CustomToast.css'

const toastTitles = {
  success: 'Success',
  error: 'Error',
  info: 'Info',
  warning: 'Warning'
}

const toastIcons = {
  success: faCheck,
  error: faXmark,
  info: faInfo,
  warning: faExclamation
}

/**
 * Atom: toast notification (success | error | info | warning)
 */
function CustomToast({
  open,
  title,
  message,
  variant = 'info',
  autoHideDuration = 3000,
  onClose,
  anchorOrigin = { vertical: 'top', horizontal: 'right' },
  ...props
}) {
  const resolvedTitle = title ?? toastTitles[variant] ?? toastTitles.info

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      className="custom-toast-snackbar"
      {...props}
    >
      <div className={`custom-toast custom-toast--${variant}`} role="alert">
        <span className="custom-toast__accent" aria-hidden="true" />

        <span className="custom-toast__icon" aria-hidden="true">
          <FontAwesomeIcon icon={toastIcons[variant] ?? toastIcons.info} />
        </span>

        <div className="custom-toast__body">
          <p className="custom-toast__title">{resolvedTitle}</p>
          {message ? <p className="custom-toast__message">{message}</p> : null}
        </div>

        <IconButton
          className="custom-toast__close"
          onClick={onClose}
          aria-label="Đóng thông báo"
          size="small"
        >
          <FontAwesomeIcon icon={faXmark} />
        </IconButton>
      </div>
    </Snackbar>
  )
}

export default memo(CustomToast)
