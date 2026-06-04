import { useEffect, useState } from 'react'

import CustomToast from './CustomToast'

const listeners = new Set()

export const toast = {
  show({ message, title, variant = 'info', duration = 3000 }) {
    listeners.forEach((listener) => {
      listener({ open: true, message, title, variant, duration })
    })
  },
  success(message, options = {}) {
    toast.show({ message, variant: 'success', ...options })
  },
  error(message, options = {}) {
    toast.show({ message, variant: 'error', ...options })
  },
  warning(message, options = {}) {
    toast.show({ message, variant: 'warning', ...options })
  },
  info(message, options = {}) {
    toast.show({ message, variant: 'info', ...options })
  },
  subscribe(listener) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }
}

export function ToastContainer() {
  const [toastState, setToastState] = useState({
    open: false,
    title: '',
    message: '',
    variant: 'info',
    duration: 3000
  })

  useEffect(() => toast.subscribe(setToastState), [])

  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setToastState((prev) => ({ ...prev, open: false }))
  }

  return (
    <CustomToast
      open={toastState.open}
      title={toastState.title}
      message={toastState.message}
      variant={toastState.variant}
      autoHideDuration={toastState.duration}
      onClose={handleClose}
    />
  )
}

export { default } from './CustomToast'
