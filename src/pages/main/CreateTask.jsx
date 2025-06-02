import React from 'react'
import CreateTaskStepForm from '../../components/CreateTaskStepForm'

export default function CreateTask() {
    return (
        <div className='pt-4 space-y-4 w-full max-w-4xl mx-auto'>
            <h4 className='text-xl font-semibold text-gray-600'>
                Create Task
            </h4>

            <div className='w-full flex justify-center'>
                <CreateTaskStepForm />
            </div>
        </div>
    )
}
