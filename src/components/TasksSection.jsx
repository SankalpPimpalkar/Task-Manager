import React from 'react'
import { Link } from 'react-router-dom'
import DueDateFormat from '../helpers/DueDateFormat'

export default function TasksSection({ tasks = [] }) {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2'>
            {
                tasks?.length > 0 ? tasks?.map(task => (
                    <Link to={`/tasks/${task.$id}`} key={task.$id} className='border border-gray-300 p-4 bg-gray-50 rounded-md space-y-2'>
                        <h5 className='font-semibold text-gray-700'>
                            {task.title}
                        </h5>

                        <p className="text-gray-500 text-sm line-clamp-3" title={task?.description}>
                            {task?.description}
                        </p>

                        <h6 className='text-sm font-semibold text-gray-700'>
                            {task.project.name}
                        </h6>

                        <p className='text-xs text-gray-600'>
                            Assigned by {task.assigned_by.name}
                        </p>

                        <div className='w-full flex justify-end pt-2'>
                            <p className='text-xs text-gray-400'>
                                {DueDateFormat(task.due_date)}
                            </p>
                        </div>
                    </Link>
                )) : (
                    <p className='text-sm text-gray-400 text-pretty col-span-full'>
                        You don't have any tasks assigned to you yet.
                    </p>
                )
            }
        </div>
    )
}
