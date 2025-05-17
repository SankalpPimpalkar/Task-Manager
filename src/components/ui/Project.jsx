import React from 'react'
import { Folder, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

export default function Project({ project }) {
    // Calculate completion percentage
    const totalTasks = project.tasks?.length || 0
    const completedTasks = project.tasks?.filter(task => task.status === 'Completed').length || 0
    const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    // Format description - return null if empty or very short
    const formatDescription = (desc) => {
        if (!desc || desc.trim().length < 3) return 'No description'
        return desc.length > 100 ? `${desc.substring(0, 100)}...` : desc
    }

    return (
        <Link
            to={`/projects/${project.$id}`}
            className="block border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all group h-full"
        >
            <div className="flex flex-col h-full">
                {/* Header with icon and title */}
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                        <Folder className="text-gray-500 group-hover:text-blue-500 transition-colors" size={18} />
                        <h3 className="font-bold text-gray-900 truncate max-w-[180px]">{project.title}</h3>
                    </div>
                    {completionPercentage === 100 && (
                        <CheckCircle2 
                            className="text-green-500" 
                            size={16} 
                        />
                    )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 mb-4 min-h-[40px]">
                    {formatDescription(project.description)}
                </p>

                {/* Progress section - only show if there are tasks */}
                {totalTasks > 0 ? (
                    <div className="mt-auto">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Progress: {completionPercentage}%</span>
                            <span>{completedTasks}/{totalTasks} tasks</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                            <div 
                                className={`h-1.5 rounded-full ${completionPercentage === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                                style={{ width: `${completionPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                ) : (
                    <div className="text-xs text-gray-400 mt-auto">No tasks yet</div>
                )}

                {/* Footer with dates */}
                <div className="flex justify-between items-center pt-3 border-t border-gray-100 text-xs text-gray-500">
                    <span>Created: {format(new Date(project.$createdAt), 'MMM d, yyyy')}</span>
                    <span>Updated: {format(new Date(project.$updatedAt), 'MMM d, yyyy')}</span>
                </div>
            </div>
        </Link>
    )
}