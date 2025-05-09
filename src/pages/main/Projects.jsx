import { useState, useEffect } from 'react'
import { GET_PROJECTS_BY_MEMBER } from '../../appwrite/database'
import { useDispatch } from 'react-redux'
import { loadProjects } from '../../redux/slices/project.slice'
import ProjectItem from '../../components/ProjectItem'
import ProjectSkeleton from '../../components/skeletons/ProjectSkeletion'

export default function Projects() {
    const [isLoading, setIsLoading] = useState(true)
    const [projects, setProjects] = useState([])
    const dispatch = useDispatch()

    const fetchProjects = async () => {
        try {
            const resp = await GET_PROJECTS_BY_MEMBER()
            if (resp) {
                setProjects(resp)
                dispatch(loadProjects(resp))
            }

        } catch (error) {
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    return (
        <div className='border border-[#1d1f29] bg-[#11131e] p-5 col-span-4 rounded-md flex flex-col h-[calc(100dvh-40px)]'>
            {/* Fixed Header */}
            <div className='pb-6'>
                <h1 className='text-2xl font-bold text-white'>
                    Projects
                </h1>
            </div>

            {/* Scrollable Tasks Area */}
            <div className='flex-1 overflow-y-auto mb-6 md:mb-0'>
                {isLoading ? (
                    <ProjectSkeleton />
                ) : (
                    <ul className='space-y-4 pr-2'>
                        {projects.map(project => (
                            <ProjectItem key={project.$id} project={project} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}