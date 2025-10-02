import { 
  Calendar, 
  Columns, 
  MapPin, 
  PieChart, 
  Table, 
  X,
  Filter
} from "lucide-react"
import React, { useCallback, useEffect, useRef } from "react"

function ViewsMenu({
  className = '',
  onClose,
  onViewSelect
}) {
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  const handleViewSelect = useCallback((viewType) => {
    if (onViewSelect) {
      onViewSelect(viewType)
    }
    if (onCloseRef.current) {
      onCloseRef.current()
    }
  }, [onViewSelect])

  const handleClose = useCallback(() => {
    if (onCloseRef.current) {
      onCloseRef.current()
    }
  }, [])

  const viewOptions = [
    {
      id: 'board',
      name: 'Board',
      icon: Columns,
      description: 'Kanban board layout'
    },
    {
      id: 'table',
      name: 'Table',
      icon: Table,
      description: 'Table view with rows and columns'
    },
    {
      id: 'calendar',
      name: 'Calendar',
      icon: Calendar,
      description: 'Calendar view for scheduling'
    },
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: PieChart,
      description: 'Analytics and charts'
    },
    {
      id: 'timeline',
      name: 'Timeline',
      icon: Filter,
      description: 'Timeline and filter view'
    },
    {
      id: 'map',
      name: 'Map',
      icon: MapPin,
      description: 'Geographic map view'
    }
  ]

  return (
    <div className={`min-w-[30rem] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}>
      {/* Header Section */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-[1.6rem] font-bold text-gray-900 dark:text-gray-100">
            Views
          </h3>
          <div
            onClick={handleClose}
            className="cursor-pointer hover:bg-gray-200/70 focus:bg-gray-200/70 rounded-md p-2"
          >
            <X size={16} className="text-gray-600 dark:text-gray-400" />
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        {viewOptions.map((view, index) => {
          const IconComponent = view.icon
          return (
            <div
              key={view.id}
              onClick={() => handleViewSelect(view.id)}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left cursor-pointer"
            >
              <IconComponent size={18} className="text-gray-600 dark:text-gray-400" />
              <span className="text-gray-900 dark:text-gray-100 text-[1.6rem]">
                {view.name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default React.memo(ViewsMenu)
