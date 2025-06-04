import { useNavigate } from "react-router-dom";
import ProjectsSection from "../../components/ProjectsSection";
import useAuth from "../../hooks/useAuth";


export default function Projects() {

    const navigate = useNavigate()
    const { user } = useAuth()

    return (
        <div className='pt-4 space-y-4'>
            <div className='w-full flex items-center justify-between'>
                <h4 className='text-xl font-semibold text-gray-600'>
                    Your Projects
                </h4>

                <button onClick={() => navigate('/projects/create')} className='bg-blue-50 border border-blue-300 rounded-md text-blue-600 text-sm px-3 py-1.5 cursor-pointer'>
                    Create Project
                </button>
            </div>

            <ProjectsSection projects={user?.projects} />
        </div>
    )
}
