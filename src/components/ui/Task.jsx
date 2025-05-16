import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { Clock, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'

const statusIcons = {
    Pending: <Clock className="text-yellow-500" size={16} />,
    'In Progress': <Loader2 className="text-blue-500 animate-spin" size={16} />,
    Important: <AlertCircle className="text-red-500" size={16} />,
    Completed: <CheckCircle2 className="text-green-500" size={16} />
}

const priorityColors = {
    urgent: 'bg-red-100 text-red-800',
    high: 'bg-orange-100 text-orange-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-blue-100 text-blue-800'
}

export default function Task({ task }) {
    return (
        <Link
            to={`/tasks/${task.$id}`}
            className='block border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all'
        >
            <div className='flex-1 items-start gap-3'>
                <div className='w-full flex items-center justify-between'>
                    <div className={`p-1 rounded-full w-fit ${task.status === 'Completed' ? 'bg-green-50' : task.status === 'Important' ? 'bg-red-50' : task.status === 'In Progress' ? 'bg-blue-50' : 'bg-yellow-50'}`}>
                        {statusIcons[task.status] || <Clock className="text-gray-500" size={16} />}
                    </div>
                    {task.priority && (
                        <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
                            {task.priority}
                        </span>
                    )}
                </div>
                <div className='flex-1 min-w-0 pt-2'>
                    <div className='flex justify-between items-start'>
                        <h3 className='font-medium text-gray-900 truncate'>{task.title}</h3>
                    </div>
                    <p className='text-sm text-gray-500 mt-1 line-clamp-2'>{task.description}</p>

                    {task.project && (
                        <div className='mt-2 flex items-center gap-2 text-xs text-gray-500'>
                            <span>Project:</span>
                            <span className='font-medium'>{task.project.title}</span>
                        </div>
                    )}

                    <div className='flex items-center justify-between mt-2 pt-2 border-t border-gray-100 text-xs'>
                        <div className='text-gray-500'>
                            Due: {format(new Date(task.due_date), 'MMM d, yyyy')}
                        </div>
                        {task.assigned_by && (
                            <div className='text-gray-500 truncate ml-2'>
                                By: {task.assigned_by.name}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}