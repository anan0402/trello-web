import { memo } from 'react'
import Avatar from '@mui/material/Avatar'
import './CustomAvatar.css'

/**
 * CustomAvatar - A customizable avatar component
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for the image
 * @param {string} size - Size of the avatar: 'small', 'medium', 'large', 'xlarge' (default: 'medium')
 * @param {string} fallback - Fallback text to display when no image (e.g., user initials)
 * @param {function} onClick - Click handler
 * @param {string} className - Additional CSS classes
 */
function CustomAvatar({
  src,
  alt,
  size = 'medium',
  fallback,
  onClick,
  className = '',
  ...props
}) {
  const sizeClass = `custom-avatar-${size}`
  const clickableClass = onClick ? 'custom-avatar-clickable' : ''
  return (
    <Avatar
      src={src}
      alt={alt}
      onClick={onClick}
      className={`custom-avatar ${sizeClass} ${clickableClass} ${className}`}
      {...props}
    >
      {fallback}
    </Avatar>
  )
}

export default memo(CustomAvatar)
