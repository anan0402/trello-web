import React, { useCallback, useEffect, useRef } from "react"

function Popup({ 
  isOpen = false, 
  onClose, 
  children, 
  position = 'bottom', // 'top', 'bottom', 'left', 'right'
  className = '',
  triggerRef = null
}) {
  const popupRef = useRef(null)

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        (!triggerRef?.current || !triggerRef.current.contains(e.target))
      ) {
        if (onClose) {
          onClose()
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose, triggerRef])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen && onClose) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const getPositionClasses = useCallback(() => {
    const positions = {
      top: 'bottom-full mb-2',
      bottom: 'top-full mt-2',
      left: 'right-full mr-2',
      right: 'left-full ml-2'
    }
    return positions[position] || positions.bottom
  }, [position])

  if (!isOpen) return null

  return (
    <div
      ref={popupRef}
      className={`absolute z-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 ${getPositionClasses()} ${className}`}
    >
      {children}
    </div>
  )
}

export default React.memo(Popup)

