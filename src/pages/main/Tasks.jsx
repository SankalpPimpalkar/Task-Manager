import React from 'react'
import TasksSection from '../../components/TasksSection'

export default function Tasks() {
    return (
        <div className='pt-4 space-y-4'>
            <h4 className='text-xl font-semibold text-gray-600'>
                Your Tasks
            </h4>

            <TasksSection />
        </div>
    )
}
