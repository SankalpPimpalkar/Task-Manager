import { useEffect, useState } from 'react'
import ProjectSkeleton from '../../components/skeletons/ProjectSkeletion'
import { GET_PROJECT_BY_ID } from '../../appwrite/database'
import { useParams, Link } from 'react-router-dom'
import { Users, Calendar, GitBranch, FileText, ArrowRight, Check, Circle, AlertTriangle, Clock } from 'lucide-react'
import getRelativeTimeFromNow from '../../helpers/getRelativeTimeFromNow'

export default function Project() {
    const [isLoading, setIsLoading] = useState(true)
    const [project, setProject] = useState(null)
    const { id } = useParams()

    const fetchProject = async () => {
        try {
            const resp = await GET_PROJECT_BY_ID(id)
            setProject(resp)
        } catch (error) {
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchProject()
    }, [])

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'urgent': return <AlertTriangle className="w-4 h-4 mr-1 text-red-400" />
            case 'high': return <AlertTriangle className="w-4 h-4 mr-1 text-yellow-400" />
            default: return <Circle className="w-4 h-4 mr-1 text-blue-400" />
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Completed': return <Check className="text-emerald-400" />
            case 'Pending': return <Clock className="text-yellow-400" />
            default: return <Circle className="text-gray-400" />
        }
    }

    const completedTasks = project?.tasks.filter(t => t.status === 'Completed').length || 0
    const totalTasks = project?.tasks.length || 1
    const progressPercentage = Math.round((completedTasks / totalTasks) * 100)

    return (
        <div className='border border-[#1d1f29] bg-[#11131e] p-5 col-span-4 rounded-md flex flex-col h-[calc(100dvh-40px)]'>
            {/* Fixed Header */}
            <div className='pb-6 flex justify-between items-center'>
                <h1 className='text-2xl font-bold text-white'>
                    Project Details
                </h1>
                <Link to="/projects" className="text-[#8a8d9b] hover:text-white transition-colors">
                    <ArrowRight className="w-5 h-5 rotate-180" />
                </Link>
            </div>

            {/* Scrollable Content Area */}
            <div className='flex-1 overflow-y-auto  mb-20 md:mb-0'>
                {isLoading ? (
                    <ProjectSkeleton />
                ) : project ? (
                    <div className='space-y-6 pr-2'>
                        {/* Project Header */}
                        <div className='bg-[#1d1f29] p-5 rounded-lg'>
                            <div className="flex justify-between items-start mb-4">
                                <h2 className='text-xl font-semibold text-white'>{project.title}</h2>
                            </div>
                            <p className='text-[#b5b7ba] text-sm mb-6'>{project.description}</p>
                            
                            {/* Stats Section */}
                            <div className="flex flex-wrap gap-4 mb-6">
                                <div className="flex items-center text-xs text-blue-400 bg-blue-400/10 px-3 py-1.5 rounded-full">
                                    <Users className="w-4 h-4 mr-2" />
                                    {project.members.length} {project.members.length === 1 ? 'Member' : 'Members'}
                                </div>

                                <div className="flex items-center text-xs text-purple-400 bg-purple-400/10 px-3 py-1.5 rounded-full">
                                    <GitBranch className="w-4 h-4 mr-2" />
                                    {project.tasks.length} {project.tasks.length === 1 ? 'Task' : 'Tasks'}
                                </div>
                            </div>

                            {/* Progress Section */}
                            <div className="mb-4">
                                <div className="flex justify-between text-xs text-[#8a8d9b] mb-2">
                                    <span>Progress</span>
                                    <span>{progressPercentage}%</span>
                                </div>
                                <div className="w-full bg-[#252833] rounded-full h-1.5">
                                    <div
                                        className="bg-emerald-500 h-1.5 rounded-full"
                                        style={{ width: `${progressPercentage}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-xs text-[#8a8d9b]">
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    Created {getRelativeTimeFromNow(project.$createdAt)}
                                </div>
                                <div className="flex items-center">
                                    <FileText className="w-4 h-4 mr-1" />
                                    Last updated {getRelativeTimeFromNow(project.$updatedAt)}
                                </div>
                            </div>
                        </div>

                        {/* Team Members */}
                        <div className='bg-[#1d1f29] p-5 rounded-lg'>
                            <h3 className='text-lg font-semibold text-white mb-4'>Team Members</h3>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                {project.members.map(member => (
                                    <div key={member.$id} className='flex items-center p-3 bg-[#252833] rounded-lg'>
                                        <div className='w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white'>
                                            {member.name.charAt(0)}
                                        </div>
                                        <div className='ml-3'>
                                            <h4 className='text-white font-medium'>{member.name}</h4>
                                            <p className='text-[#b5b7ba] text-sm'>{member.occupation}</p>
                                            <p className='text-[#8a8d9b] text-xs mt-1'>{member.email}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tasks */}
                        <div className='bg-[#1d1f29] p-5 rounded-lg'>
                            <h3 className='text-lg font-semibold text-white mb-4'>Tasks</h3>
                            <div className='space-y-3'>
                                {project.tasks.map(task => (
                                    <div key={task.$id} className='p-4 bg-[#252833] rounded-lg hover:bg-[#2e303d] transition-colors'>
                                        <div className='flex flex-col gap-3 md:flex-row md:justify-between items-start'>
                                            <div>
                                                <h4 className='text-white font-medium flex flex-col md:flex-row gap-3 items-start md:items-center'>
                                                    <div className=''>
                                                    {getStatusIcon(task.status)}
                                                    </div>
                                                    {task.title}
                                                </h4>
                                                <p className='text-[#b5b7ba] text-sm mt-2'>{task.description}</p>
                                            </div>
                                            <div className="flex items-center text-xs text-white bg-[#3a3d4a] px-2.5 py-1 rounded-full">
                                                {getPriorityIcon(task.priority)}
                                                {task.priority}
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-between mt-4 text-xs text-[#8a8d9b]'>
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                Due {getRelativeTimeFromNow(task.due_date)}
                                            </div>
                                            {task.assignee && (
                                                <div className='flex items-center'>
                                                    <span className='mr-2'>Assigned to:</span>
                                                    <div className='flex items-center'>
                                                        <div className='w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white'>
                                                            {task.assignee.name.charAt(0)}
                                                        </div>
                                                        <span className='text-white ml-1'>{task.assignee.username}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='text-center text-[#8a8d9b] py-10'>
                        No project data available
                    </div>
                )}
            </div>
        </div>
    )
}