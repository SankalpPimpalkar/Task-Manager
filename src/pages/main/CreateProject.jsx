import React from 'react'
import CreateProjectStepForm from '../../components/CreateProjectStepForm'

export default function CreateProject() {
    return (
        <div className='pt-4 space-y-4 w-full max-w-4xl mx-auto'>
            <h4 className='text-xl font-semibold text-gray-600'>
                Create Project
            </h4>

            <div className='w-full flex justify-center'>
                <CreateProjectStepForm />
            </div>
        </div>
    )
}
