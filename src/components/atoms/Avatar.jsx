import React from "react"
import { User } from "lucide-react"

function Avatar({ 
  src = '', 
  alt = 'User avatar', 
  size = 'md', 
  className = '',
  onClick
}) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  }

  const baseClasses = `rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold cursor-pointer hover:opacity-90 transition-opacity ${sizeClasses[size]} ${className}`

  if (src) {
    return (
      <div className={baseClasses} onClick={onClick}>
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
      </div>
    )
  }

  // Fallback to icon if no image
  return (
    <div className={baseClasses} onClick={onClick}>
      <User size={size === 'sm' ? 16 : size === 'md' ? 20 : size === 'lg' ? 24 : 32} />
    </div>
  )
}

export default React.memo(Avatar)

