import React, { useCallback, useEffect, useRef, useState } from 'react'
import { X, User, ChevronDown } from 'lucide-react'

function FilterMenu({ onClose }) {
  const [keyword, setKeyword] = useState('')
  const [noMembersChecked, setNoMembersChecked] = useState(false)
  const [selectMembersChecked, setSelectMembersChecked] = useState(false)
  const [markedCompleteChecked, setMarkedCompleteChecked] = useState(false)
  const [notMarkedCompleteChecked, setNotMarkedCompleteChecked] = useState(false)

  const onCloseRef = useRef(onClose)
  useEffect(() => {
      onCloseRef.current = onClose
  }, [onClose])

  const handleClose = useCallback(() => {
    onCloseRef.current()
  }, [])

  const handleKeywordChange = useCallback((e) => {
    setKeyword(e.target.value)
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 min-w-[30rem]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <span className="text-[1.6rem] font-bold text-gray-900">Filter</span>
        <div
          onClick={handleClose}
          className="relative flex items-center gap-1 cursor-pointer hover:bg-gray-200/70 focus:bg-gray-200/70 rounded-md p-2"
        >
          <X size={20} />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Keyword Section */}
        <div className="space-y-2">
          <label className="block text-[1.6rem] font-medium text-gray-900">
            Keyword
          </label>
          <input
            type="text"
            value={keyword}
            onChange={handleKeywordChange}
            placeholder="Enter a keyword..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-[1.6rem] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
          <p className="text-[1.1rem] text-gray-500">
            Search cards, members, labels, and more.
          </p>
        </div>

        {/* Members Section */}
        <div className="space-y-3">
          <label className="block text-[1.4rem] font-medium text-gray-900">
            Members
          </label>
          
          {/* No members option */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="checkbox"
                id="no-members"
                checked={noMembersChecked}
                onChange={(e) => setNoMembersChecked(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
            </div>
            <div className="flex items-center gap-2">
              <User size={16} className="text-gray-500" />
              <span className="text-[1.6rem] text-gray-900">No members</span>
            </div>
          </div>

          {/* Select members option */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="checkbox"
                id="select-members"
                checked={selectMembersChecked}
                onChange={(e) => setSelectMembersChecked(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
            </div>
            <div className="flex items-center gap-2 flex-1">
              <span className="text-[1.6rem] text-gray-900">Select members</span>
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>
        </div>

        {/* Card Status Section */}
        <div className="space-y-3">
          <label className="block text-[1.6rem] font-medium text-gray-900">
            Card status
          </label>
          
          {/* Marked as complete option */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="checkbox"
                id="marked-complete"
                checked={markedCompleteChecked}
                onChange={(e) => setMarkedCompleteChecked(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
            </div>
            <span className="text-[1.6rem] text-gray-900">Marked as complete</span>
          </div>

          {/* Not marked as complete option */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="checkbox"
                id="not-marked-complete"
                checked={notMarkedCompleteChecked}
                onChange={(e) => setNotMarkedCompleteChecked(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
            </div>
            <span className="text-[1.6rem] text-gray-900">Not marked as complete</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(FilterMenu)
