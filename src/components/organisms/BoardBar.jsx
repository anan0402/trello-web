import { ChevronDown, EllipsisIcon, EllipsisVertical, Globe, ListFilter, MoreVertical, Star, StretchVertical } from "lucide-react"
import React, { useCallback, useRef, useState } from 'react'
import Avatar from '../atoms/Avatar'
import Text from '../atoms/Text'
import ViewsMenu from '../menus/ViewsMenu'
import VisibilityMenu from '../menus/VisibilityMenu'
import FilterMenu from '../menus/FilterMenu'
import BoardMenu from '../menus/BoardMenu'
import Popup from '../molecules/Popup'

function BoardBar({ boardId, boardName = "Kanban Template" }) {
  const [isViewsMenuOpen, setIsViewsMenuOpen] = useState(false)
  const [isVisibilityMenuOpen, setIsVisibilityMenuOpen] = useState(false)
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
  const [isBoardMenuOpen, setIsBoardMenuOpen] = useState(false)
  const viewsMenuRef = useRef(null)
  const visibilityMenuRef = useRef(null)
  const filterMenuRef = useRef(null)
  const boardMenuRef = useRef(null)

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

  const handleVisibilityMenuClick = useCallback(() => {
    setIsVisibilityMenuOpen(prev => !prev)
  }, [])

  const handleCloseVisibilityMenu = useCallback(() => {
    setIsVisibilityMenuOpen(false)
  }, [])

  const handleVisibilitySelect = useCallback((visibilityType) => {
    console.log('Selected visibility:', visibilityType)
    // Handle visibility selection logic here
  }, [])

  const handleFilterMenuClick = useCallback(() => {
    setIsFilterMenuOpen(prev => !prev)
  }, [])

  const handleCloseFilterMenu = useCallback(() => {
    setIsFilterMenuOpen(false)
  }, [])

  const handleBoardMenuClick = useCallback(() => {
    setIsBoardMenuOpen(prev => !prev)
  }, [])

  const handleCloseBoardMenu = useCallback(() => {
    setIsBoardMenuOpen(false)
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
            <StretchVertical size={20} className="text-gray-800" />
            <ChevronDown size={20} className="text-gray-800" />
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
          <Avatar src={''} alt={'John Doe'} size="sm" />
        </div>
        <div
          ref={filterMenuRef}
          onClick={handleFilterMenuClick}
          className="relative cursor-pointer hover:bg-gray-200/70 focus:bg-gray-200/70 rounded-md p-2"
        >
          <ListFilter size={20} className="text-gray-800" />
          <Popup
            isOpen={isFilterMenuOpen}
            onClose={handleCloseFilterMenu}
            position="bottom"
            triggerRef={filterMenuRef}
            className="right-0"
          >
            <FilterMenu
              onClose={handleCloseFilterMenu}
            />
          </Popup>
        </div>
        <div className="cursor-pointer hover:bg-gray-200/70 focus:bg-gray-200/70 rounded-md p-2">
          <Star size={20} className="text-gray-800" />
        </div>
        <div
          ref={visibilityMenuRef}
          onClick={handleVisibilityMenuClick}
          className="relative cursor-pointer hover:bg-gray-200/70 focus:bg-gray-200/70 rounded-md p-2"
        >
          <Globe size={20} className="text-gray-800" />
          <Popup
            isOpen={isVisibilityMenuOpen}
            onClose={handleCloseVisibilityMenu}
            position="bottom"
            triggerRef={visibilityMenuRef}
            className="right-0"
          >
            <VisibilityMenu
              onClose={handleCloseVisibilityMenu}
              onVisibilitySelect={handleVisibilitySelect}
            />
          </Popup>
        </div>
        <div
          ref={boardMenuRef}
          onClick={handleBoardMenuClick}
          className="relative cursor-pointer hover:bg-gray-200/70 focus:bg-gray-200/70 rounded-md p-2"
        >
          <EllipsisIcon size={20} className="text-gray-800" />
          <Popup
            isOpen={isBoardMenuOpen}
            onClose={handleCloseBoardMenu}
            position="bottom"
            triggerRef={boardMenuRef}
            className="right-0"
          >
            <BoardMenu
              onClose={handleCloseBoardMenu}
            />
          </Popup>
        </div>
      </div>
    </div>
  )
}

export default React.memo(BoardBar)


