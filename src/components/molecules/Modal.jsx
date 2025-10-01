import { X } from "lucide-react"
import React, { useCallback, useEffect } from "react"
import Button from "../atoms/Button"

function Modal({ 
  isOpen = false, 
  onClose, 
  children, 
  title = '', 
  showCloseButton = true,
  className = '',
  overlayClassName = ''
}) {
  
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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget && onClose) {
      onClose()
    }
  }, [onClose])

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose()
    }
  }, [onClose])

  if (!isOpen) return null

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${overlayClassName}`}
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col ${className}`}>
        
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            {title && (
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <Button
                onClick={handleClose}
                className="ml-auto p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} className="text-gray-500 dark:text-gray-400" />
              </Button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default React.memo(Modal)

