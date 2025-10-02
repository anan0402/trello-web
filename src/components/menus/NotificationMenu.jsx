import { MoreVertical, Sparkles } from "lucide-react"
import React, { useCallback, useEffect, useRef, useState } from "react"

function NotificationMenu({
  className = '',
  onClose
}) {
  const [showUnreadOnly, setShowUnreadOnly] = useState(true)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  const handleToggleUnread = useCallback(() => {
    setShowUnreadOnly(prev => !prev)
  }, [])

  const handleMoreOptions = useCallback(() => {
    // Handle more options click
    console.log('More options clicked')
  }, [])

  return (
    <div className={`w-[30rem] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}>
      {/* Header Section */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-[1.6rem] font-bold text-gray-900 dark:text-gray-100">
            Notifications
          </h3>

          <div className="flex items-center gap-3">
            <button
              onClick={handleMoreOptions}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              <MoreVertical size={16} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        {/* Empty State Illustration */}
        <div className="flex flex-col items-center justify-center text-center">
          {/* Circular illustration with husky */}
          <div className="relative w-24 h-24 mb-4">
            <div className="w-full h-full rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center relative overflow-hidden">
              {/* Husky illustration */}
              <div className="relative z-10">
                {/* Husky body */}
                <div className="w-16 h-12 bg-gray-300 dark:bg-gray-400 rounded-full relative">
                  {/* Head */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-10 bg-gray-300 dark:bg-gray-400 rounded-full">
                    {/* Muzzle */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-white rounded-full"></div>
                    {/* Eyes */}
                    <div className="absolute top-2 left-2 w-1 h-1 bg-gray-800 rounded-full"></div>
                    <div className="absolute top-2 right-2 w-1 h-1 bg-gray-800 rounded-full"></div>
                  </div>
                  {/* Paw */}
                  <div className="absolute top-1 right-1 w-3 h-3 bg-gray-300 dark:bg-gray-400 rounded-full"></div>
                </div>
                {/* Collar */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-blue-400 rounded-full"></div>
              </div>

              {/* Sparkles */}
              <div className="absolute top-2 left-2">
                <Sparkles size={8} className="text-purple-400" />
              </div>
              <div className="absolute top-4 right-3">
                <Sparkles size={6} className="text-purple-300" />
              </div>
              <div className="absolute bottom-3 left-3">
                <Sparkles size={7} className="text-purple-400" />
              </div>
              <div className="absolute bottom-2 right-2">
                <Sparkles size={5} className="text-purple-300" />
              </div>
            </div>
          </div>

          {/* Message */}
          <p className="text-gray-600 dark:text-gray-400 text-[1.4rem]">
            No unread notifications
          </p>
        </div>
      </div>
    </div>
  )
}

export default React.memo(NotificationMenu)
