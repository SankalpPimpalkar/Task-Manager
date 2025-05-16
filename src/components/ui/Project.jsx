import React from 'react'
import { Folder, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

export default function Project({ project }) {
    // Calculate completion percentage
    const totalTasks = project.tasks?.length || 0
    const completedTasks = project.tasks?.filter(task => task.status === 'Completed').length || 0
    const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    return (
        <Link
            to={`/projects/${project.$id}`}
            className="block border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all group"
        >
            <div className="flex flex-col items-start gap-4">
                <div className="relative">
                    <Folder className="text-gray-500 mt-0.5 flex-shrink-0 group-hover:text-blue-500 transition-colors" size={18} />
                    {completionPercentage === 100 && (
                        <CheckCircle2 
                            className="absolute -top-1 -right-1 text-green-500 bg-white rounded-full" 
                            size={14} 
                        />
                    )}
                </div>
                <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-gray-900 truncate">{project.title}</h3>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                            {format(new Date(project.$createdAt), 'MMM d, yyyy')}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{project.description}</p>

                    {/* Progress bar */}
                    <div>
                        <div className="flex justify-between text-xs text-gray-500 mb-2">
                            <span>Progress: {completionPercentage}%</span>
                            <span>{completedTasks}/{totalTasks} tasks</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                                className={`h-1.5 rounded-full ${completionPercentage === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                                style={{ width: `${completionPercentage}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Members and dates */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                        {/* Stacked avatars */}
                        <div className="flex -space-x-2">
                            {project.members_id?.length > 3 && (
                                <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-500">
                                    +{project.members_id.length - 3}
                                </div>
                            )}
                        </div>

                        <div className="text-xs text-gray-500">
                            Updated: {format(new Date(project.$updatedAt), 'MMM d, yyyy')}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}