import Button from '../../components/ui/Button'
import { Plus } from 'lucide-react'
import { useSelector } from 'react-redux'
import Project from '../../components/ui/Project'
import CreateProject from '../../components/modals/CreateProject'
import { useState } from 'react'

export default function Home() {
    const user = useSelector(state => state.auth.user)
    const [isOpenCreateProjectModal, setIsOpenCreateProjectModal] = useState(false)

    return (
        <div className='w-full space-y-4'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-2xl md:text-3xl text-gray-700'>
                    Your Projects
                </h1>

                <div>
                    <Button onClick={() => setIsOpenCreateProjectModal(true)} className='bg-gray-800 text-xs md:text-sm font-medium py-3'>
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

            <CreateProject
                isOpen={isOpenCreateProjectModal}
                onClose={() => setIsOpenCreateProjectModal(false)}
            />
        </div>
    )
}