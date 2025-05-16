import React, { useEffect, useState, useTransition } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GET_PROJECT_BY_ID } from '../../appwrite/database'
import { toast } from 'react-toastify'
import { Folder, CheckCircle2, Clock, AlertCircle, Loader2, Link as LinkIcon, Users, Calendar, ListChecks } from 'lucide-react'
import { format } from 'date-fns'
import Button from '../../components/ui/Button'

const statusIcons = {
    Pending: <Clock className="text-yellow-500" size={16} />,
    'In Progress': <Loader2 className="text-blue-500 animate-spin" size={16} />,
    Important: <AlertCircle className="text-red-500" size={16} />,
    Completed: <CheckCircle2 className="text-green-500" size={16} />
}

const priorityColors = {
    urgent: 'bg-red-100 text-red-800',
    high: 'bg-orange-100 text-orange-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-blue-100 text-blue-800'
}

export default function ProjectDetails() {
    const { projectId } = useParams()
    const [project, setProject] = useState(null)
    const [isPendingProject, startPendingProjectTransition] = useTransition()

    function handleFetchProject() {
        startPendingProjectTransition(async () => {
            const resp = await GET_PROJECT_BY_ID(projectId)
            if (resp) {
                setProject(resp)
                toast.success('Project data fetched successfully')
            }
        })
    }

    useEffect(() => {
        handleFetchProject()
    }, [])

    if (!project) {
        return (
            <div className='w-full space-y-4'>
                <div className='flex items-center justify-between w-full'>
                    <h1 className='font-bold text-2xl md:text-3xl text-gray-700'>
                        Project Details
                    </h1>
                </div>
                <div className='animate-pulse space-y-4'>
                    <div className='h-8 w-3/4 bg-gray-200 rounded'></div>
                    <div className='h-4 w-full bg-gray-200 rounded'></div>
                    <div className='h-4 w-2/3 bg-gray-200 rounded'></div>
                </div>
            </div>
        )
    }

    // Calculate completion percentage
    const totalTasks = project.tasks?.length || 0
    const completedTasks = project.tasks?.filter(task => task.status === 'Completed').length || 0
    const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    return (
        <div className='flex-1 space-y-6'>
            {/* Header */}
            <div className='flex items-center justify-between w-full'>
                <h1 className='font-bold text-2xl md:text-3xl text-gray-700'>
                    Project Details
                </h1>
            </div>

            {/* Project Info Card */}
            <div className='border border-gray-200 rounded-lg p-6 bg-white w-full'>
                <div className='flex flex-col items-start gap-4'>
                    <div className='p-3 bg-gray-50 rounded-lg'>
                        <Folder className='text-gray-600' size={24} />
                    </div>
                    <div className='flex-1'>
                        <div className='flex justify-between items-start'>
                            <h2 className='text-xl font-bold text-gray-900'>{project.title}</h2>
                            {completionPercentage === 100 && (
                                <span className='flex items-center gap-1 text-sm text-green-600'>
                                    <CheckCircle2 size={16} /> Completed
                                </span>
                            )}
                        </div>
                        <p className='text-gray-600 mt-2'>{project.description}</p>

                        {/* Progress Bar */}
                        <div className='mt-4'>
                            <div className='flex justify-between text-sm text-gray-600 mb-1'>
                                <span>Progress: {completionPercentage}%</span>
                                <span>{completedTasks} of {totalTasks} tasks completed</span>
                            </div>
                            <div className='w-full bg-gray-200 rounded-full h-2'>
                                <div
                                    className={`h-2 rounded-full ${completionPercentage === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                                    style={{ width: `${completionPercentage}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Meta Info */}
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-gray-100'>
                            <div className='flex items-center gap-2'>
                                <Calendar className='text-gray-400' size={16} />
                                <div>
                                    <p className='text-xs text-gray-500'>Created</p>
                                    <p className='text-sm font-medium'>{format(new Date(project.$createdAt), 'MMM d, yyyy')}</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Calendar className='text-gray-400' size={16} />
                                <div>
                                    <p className='text-xs text-gray-500'>Updated</p>
                                    <p className='text-sm font-medium'>{format(new Date(project.$updatedAt), 'MMM d, yyyy')}</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Users className='text-gray-400' size={16} />
                                <div>
                                    <p className='text-xs text-gray-500'>Members</p>
                                    <p className='text-sm font-medium'>{project.members?.length || 0}</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <ListChecks className='text-gray-400' size={16} />
                                <div>
                                    <p className='text-xs text-gray-500'>Tasks</p>
                                    <p className='text-sm font-medium'>{totalTasks}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sections Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Members Section */}
                <div className='border border-gray-200 rounded-lg p-5 bg-white lg:col-span-1'>
                    <h3 className='flex items-center gap-2 font-semibold text-lg text-gray-800 mb-4'>
                        <Users size={18} /> Team Members
                    </h3>
                    <div className='space-y-3'>
                        {project.members?.map(member => (
                            <div key={member.$id} className='flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors'>
                                <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium'>
                                    {member.name.charAt(0)}
                                </div>
                                <div className='flex-1 min-w-0'>
                                    <h4 className='font-medium text-gray-900 truncate'>{member.name}</h4>
                                    <p className='text-sm text-gray-500 truncate'>{member.occupation}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tasks Section */}
                <div className='border border-gray-200 rounded-lg p-5 bg-white lg:col-span-2'>
                    <div className='flex items-center justify-between mb-4'>
                        <h3 className='flex items-center gap-2 font-semibold text-lg text-gray-800'>
                            <ListChecks size={18} /> Tasks
                        </h3>
                        <Button className='bg-gray-800 text-xs font-medium py-2 px-3'>
                            New Task
                        </Button>
                    </div>
                    <div className='space-y-3'>
                        {project.tasks?.map(task => (
                            <Link
                                to={`/tasks/${task.$id}`}
                                key={task.$id}
                                className='block border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all'
                            >
                                <div className='flex items-start gap-3'>
                                    <div className={`p-1 rounded-full ${task.status === 'Completed' ? 'bg-green-50' : task.status === 'Important' ? 'bg-red-50' : task.status === 'In Progress' ? 'bg-blue-50' : 'bg-yellow-50'}`}>
                                        {statusIcons[task.status] || <Clock className="text-gray-500" size={16} />}
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <div className='flex justify-between items-start'>
                                            <h4 className='font-medium text-gray-900 truncate'>{task.title}</h4>
                                            <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
                                                {task.priority}
                                            </span>
                                        </div>
                                        <p className='text-sm text-gray-500 mt-1 line-clamp-2'>{task.description}</p>
                                        <div className='flex items-center justify-between mt-2 pt-2 border-t border-gray-100 text-xs'>
                                            <div className='text-gray-500'>
                                                Due: {format(new Date(task.due_date), 'MMM d, yyyy')}
                                            </div>
                                            {task.assigned_by && (
                                                <div className='text-gray-500 truncate'>
                                                    By: {task.assigned_by.name}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}