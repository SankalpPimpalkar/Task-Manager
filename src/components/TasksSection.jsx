import React from 'react'
import { Link } from 'react-router-dom'

export default function TasksSection() {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2'>
            {
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(task => (
                    <Link to={`/tasks/${task}`} key={task} className='border border-gray-300 p-4 bg-gray-50 rounded-md space-y-2'>
                        <h5 className='font-semibold text-gray-700'>
                            Task Title
                        </h5>

                        <p className='text-gray-500 text-sm'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, obcaecati.
                        </p>

                        <h6 className='text-sm font-semibold text-gray-700'>
                            Project Title
                        </h6>

                        <p className='text-xs text-gray-600'>
                            Assigned by Sankalp Pimpalkar
                        </p>

                        <div className='w-full flex justify-end pt-2'>
                            <p className='text-xs text-gray-400'>
                                Due Tommorrow
                            </p>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}
