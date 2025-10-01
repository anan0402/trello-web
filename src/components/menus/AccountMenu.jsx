import { LogOut, Settings } from "lucide-react"
import React, { useCallback, useEffect, useRef } from "react"
import Avatar from "../atoms/Avatar"

function AccountMenu({
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: ''
  },
  className = '',
  onClose
}) {

  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  const handleSettings = useCallback(() => {
    if (onCloseRef.current) {
      onCloseRef.current()
    }
  }, [])

  const handleLogout = useCallback(() => {
    if (onCloseRef.current) {
      onCloseRef.current()
    }
  }, [])


  return (
    <div className={`w-150 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}>
      {/* User Info Section */}
      <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Avatar
            src={user.avatar}
            alt={user.name}
            size="lg"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-[1.6rem] font-bold text-gray-900 dark:text-gray-100 truncate">
              {user.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {user.email}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div>
        {/* Settings Row */}
        <div
          onClick={handleSettings}
          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
        >
          <Settings size={18} className="text-gray-600 dark:text-gray-400" />
          <span className="text-gray-900 dark:text-gray-100 text-[1.6rem]">
            Settings
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700" />

        {/* Logout Row */}
        <div
          onClick={handleLogout}
          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
        >
          <LogOut size={18} className="text-red-600 dark:text-red-400" />
          <span className="text-red-600 dark:text-red-400 text-[1.6rem]">
            Logout
          </span>
        </div>
      </div>
    </div>
  )
}

export default React.memo(AccountMenu)

