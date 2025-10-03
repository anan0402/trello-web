import React from 'react'
import { Lock, Users, Building2, Globe, Check, X } from 'lucide-react'

function VisibilityMenu({ onClose, onVisibilitySelect }) {
    const visibilityOptions = [
        {
            id: 'private',
            icon: Lock,
            title: 'Private',
            description: 'Only board members can see this template. Workspace admins can close the board or remove members.',
            color: 'text-gray-500'
        },
        {
            id: 'workspace',
            icon: Users,
            title: 'Workspace',
            description: 'All members of the Workspace can see this template. Only board admins can edit.',
            color: 'text-gray-500'
        },
        {
            id: 'organization',
            icon: Building2,
            title: 'Organization',
            description: 'All members of the organization can see this template. The board must be added to an enterprise Workspace to enable this.',
            color: 'text-gray-500'
        },
        {
            id: 'public',
            icon: Globe,
            title: 'Public',
            description: 'Anyone on the internet can see this template. Only board admins can edit.',
            color: 'text-gray-500',
            selected: true
        }
    ]

    const handleVisibilityClick = (visibilityId) => {
        onVisibilitySelect(visibilityId)
        onClose()
    }

    return (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 min-w-[30rem]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <span className="text-[1.6rem] font-bold text-gray-900">Change visibility</span>
                <div
                    onClick={onClose}
                    className="relative flex items-center gap-1 cursor-pointer hover:bg-gray-200/70 focus:bg-gray-200/70 rounded-md p-2"
                >
                    <X size={20} />
                </div>
            </div>
            <div className="p-2">
                {visibilityOptions.map((option) => {
                    const IconComponent = option.icon
                    return (
                        <div
                            key={option.id}
                            onClick={() => handleVisibilityClick(option.id)}
                            className="w-full flex items-start gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors text-left"
                        >
                            <div className="flex-shrink-0 mt-0.5">
                                <IconComponent size={20} className={option.color} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-900 text-[1.6rem]">{option.title}</span>
                                    {option.selected && (
                                        <Check size={16} className="text-green-500 flex-shrink-0" />
                                    )}
                                </div>
                                <span className="text-[1.2rem] text-gray-600 mt-1 leading-relaxed">
                                    {option.description}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default VisibilityMenu
