import { ChevronDown, Globe, MoreVertical, Star, StretchVertical } from "lucide-react"
import React, { useCallback, useRef, useState } from 'react'
import Avatar from '../atoms/Avatar'
import Text from '../atoms/Text'
import ViewsMenu from '../menus/ViewsMenu'
import Popup from '../molecules/Popup'

function BoardBar({ boardId, boardName = "Kanban Template" }) {
  const [isViewsMenuOpen, setIsViewsMenuOpen] = useState(false)
  const viewsMenuRef = useRef(null)

  const handleViewsMenuClick = useCallback(() => {
    setIsViewsMenuOpen(prev => !prev)
  }, [])

  const handleCloseViewsMenu = useCallback(() => {
    setIsViewsMenuOpen(false)
  }, [])

  const handleViewSelect = useCallback((viewType) => {
    console.log('Selected view:', viewType)
    // Handle view selection logic here
  }, [])

  return (
    <div
      className="flex items-center justify-between px-6 py-4 mb-4 gap-4"
      style={{
        background: 'linear-gradient(90deg, #ffb366 0%, #ff8a95 25%, #c084fc 50%, #60a5fa 100%)',
        opacity: 0.9
      }}
    >
      <div className="flex items-center gap-4">
        <Text as="h2" className="text-gray-900 font-bold text-[1.8rem]">
          {boardName}
        </Text>

        <div className="flex items-center gap-4">
          <span className="px-3 py-1 bg-gray-200/80 text-gray-800 text-sm font-medium rounded-md">
            Template
          </span>

          <div
            ref={viewsMenuRef}
            onClick={handleViewsMenuClick}
            className="relative flex items-center gap-1 cursor-pointer hover:bg-gray-200/70 focus:bg-gray-200/70 rounded-md p-2"
          >
            <StretchVertical size={16} className="text-gray-800" />
            <ChevronDown size={16} className="text-gray-800" />
            <Popup
              isOpen={isViewsMenuOpen}
              onClose={handleCloseViewsMenu}
              position="bottom"
              triggerRef={viewsMenuRef}
              className="left-0"
            >
              <ViewsMenu
                onClose={handleCloseViewsMenu}
                onViewSelect={handleViewSelect}
              />
            </Popup>
          </div>
        </div>
      </div>

      {/* Right Section - Action Icons */}
      <div className="flex items-center gap-2">
        <div className="cursor-pointer hover:bg-gray-200/70 focus:bg-gray-200/70 rounded-md p-2">
          <MoreVertical size={18} className="text-gray-800" />
        </div>

        <div className="cursor-pointer hover:bg-gray-200/70 focus:bg-gray-200/70 rounded-md p-2">
          <Globe size={18} className="text-gray-800" />
        </div>

        <div className="cursor-pointer hover:bg-gray-200/70 focus:bg-gray-200/70 rounded-md p-2">
          <Star size={18} className="text-gray-800" />
        </div>

        <div className="cursor-pointer hover:bg-gray-200/70 focus:bg-gray-200/70 rounded-md p-2">
          <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-medium">SS</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(BoardBar)


