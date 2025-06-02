import React from 'react'
import TasksSection from '../../components/TasksSection'
import { useNavigate } from 'react-router-dom'

export default function Tasks() {

    const navigate = useNavigate()

    return (
        <div className='pt-4 space-y-4'>
            <div className='w-full flex items-center justify-between'>
                <h4 className='text-xl font-semibold text-gray-600'>
                    Your Tasks
                </h4>

                <button onClick={() => navigate('/tasks/create')} className='bg-blue-50 border border-blue-300 rounded-md text-blue-600 text-sm px-3 py-1.5 cursor-pointer'>
                    Create Task
                </button>
            </div>

            <TasksSection />
        </div>
    )
}
