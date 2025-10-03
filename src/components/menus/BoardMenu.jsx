import React from 'react'
import { Info, Globe, Share, Star, Tag, Archive, ChevronsUpDown, X } from 'lucide-react'

function BoardMenu({ onClose }) {
  const handleMenuClick = (action) => {
    console.log('Menu action:', action)
    // Handle menu action logic here
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 min-w-[30rem]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <span className="text-[1.6rem] font-bold text-gray-900">Menu</span>
        <div
          onClick={onClose}
          className="relative flex items-center gap-1 cursor-pointer hover:bg-gray-200/70 focus:bg-gray-200/70 rounded-md p-2"
        >
          <X size={20} />
        </div>
      </div>
    </div>
  )
}

export default BoardMenu
