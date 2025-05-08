import { Edit, Delete, CheckCircle2, User, Folder } from 'lucide-react'
import getRelativeTimeFromNow from '../helpers/getRelativeTimeFromNow'
import { Link } from 'react-router-dom'

const statusColors = {
    "Completed": "text-emerald-400 bg-emerald-400/10",
    "In Progress": "text-yellow-400 bg-yellow-400/10",
    "Pending": "text-sky-400 bg-sky-400/10",
    "Important": "text-red-400 bg-red-400/10"
}

export default function TaskItem({ task }) {
    return (
        <Link to={`/tasks/${task?.$id}`} className='border border-[#1d1f29] bg-[#1a1c27] rounded-lg p-4 hover:border-[#2a2d3a] transition-colors duration-200 relative block'>
            <div className='flex justify-between items-start mb-2'>
                <h4 className='text-xl font-semibold text-white'>
                    {task.title}
                </h4>
                {/* You can pass MenuBar as a prop if needed */}
            </div>

            <p className='text-[#b5b7ba] text-sm mb-4'>
                {task.description}
            </p>

            {/* Project and Assignee Information */}
            <div className='flex flex-wrap gap-3 mb-4'>
                {/* Project Information */}
                {task.project && (
                    <div className='flex items-center text-xs text-purple-400 bg-purple-400/10 px-2.5 py-1 rounded-full'>
                        <Folder size={14} className='mr-1' />
                        {task.project.title}
                    </div>
                )}

                {/* Assignee Information */}
                {task.assignee ? (
                    <div className='flex items-center text-xs text-blue-400 bg-blue-400/10 px-2.5 py-1 rounded-full'>
                        <User size={14} className='mr-1' />
                        {task.assignee.name}
                    </div>
                ) : (
                    <div className='flex items-center text-xs text-gray-400 bg-gray-400/10 px-2.5 py-1 rounded-full'>
                        <User size={14} className='mr-1' />
                        Unassigned
                    </div>
                )}
            </div>

            <div className='flex justify-between items-center'>
                <div className='flex items-center space-x-2'>
                    <p className='text-[#8a8d9b] text-xs'>
                        {getRelativeTimeFromNow(task.$createdAt)}
                    </p>
                    {task.due_date && (
                        <p className='text-[#8a8d9b] text-xs'>
                            •&nbsp; Due {getRelativeTimeFromNow(task.due_date)}
                        </p>
                    )}
                </div>

                <div className='flex items-center space-x-3'>
                    <span className={`inline-flex items-center text-xs px-2.5 py-1 rounded-full ${statusColors[task.status] || 'text-white bg-gray-500/10'}`}>
                        <CheckCircle2 size={14} className='mr-1' />
                        {task?.status.replace('_', ' ')}
                    </span>

                    <div className='flex space-x-2'>
                        <button className='p-1.5 text-[#8a8d9b] hover:text-blue-400 hover:bg-blue-400/10 rounded-md transition-colors duration-200'>
                            <Edit size={18} />
                        </button>
                        <button className='p-1.5 text-[#8a8d9b] hover:text-rose-400 hover:bg-rose-400/10 rounded-md transition-colors duration-200'>
                            <Delete size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}