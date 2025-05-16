import React from 'react'
import Button from '../../components/ui/Button'
import { Plus } from 'lucide-react'
import { useSelector } from 'react-redux'
import Project from '../../components/ui/Project'

export default function Home() {
    const user = useSelector(state => state.auth.user)

    return (
        <div className='w-full space-y-4'>
            <div className='flex items-center justify-between w-full'>
                <h1 className='font-bold text-2xl md:text-3xl text-gray-700'>
                    Your Projects
                </h1>

                <div>
                    <Button className='bg-gray-800 text-xs md:text-sm font-medium py-3'>
                        New project
                        <Plus size={18} />
                    </Button>
                </div>
            </div>

            {/* Projects container with fixed height and scroll */}
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[calc(100vh-120px)] overflow-y-auto pr-2'>
                {user?.projects?.map(project => (
                    <Project key={project.$id} project={project} />
                ))}
            </div>
        </div>
    )
}