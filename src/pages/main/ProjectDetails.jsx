import React, { useEffect, useState, useTransition } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GET_PROJECT_BY_ID } from '../../appwrite/database'
import { CheckCircle2, Clock, AlertCircle, Loader2 } from 'lucide-react'
import { format } from 'date-fns'

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
    }, [projectId])

    return (
        <div className='w-full min-h-fit flex flex-col pt-2 md:pt-0'>
            {/* Main content container with controlled scrolling */}
            <div className='flex-1 overflow-hidden'>
                <div className='h-full grid grid-cols-1 lg:grid-cols-4 gap-4'>
                    {/* Left content area (3 columns on lg screens) */}
                    <div className='lg:col-span-3 flex flex-col gap-4 h-full overflow-hidden'>
                        {/* Project header */}
                        <div className='bg-white p-4 rounded-lg border border-gray-200'>
                            <h1 className='font-bold text-2xl md:text-3xl text-gray-700'>
                                {project?.title || 'Loading project...'}
                            </h1>
                            {project?.description && (
                                <p className='text-gray-500 mt-2'>{project.description}</p>
                            )}
                        </div>

                        {/* Deployment and Source Code Links */}
                        <div className='bg-white p-4 rounded-lg border border-gray-200'>
                            <h2 className='font-semibold text-xl text-gray-800 mb-4'>Project Details</h2>

                            {/* Deployment Links Section */}
                            <div className='mb-6'>
                                <h3 className='flex items-center gap-2 font-medium text-gray-700 mb-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    Deployment Links
                                </h3>
                                {project?.deployment_links?.length > 0 ? (
                                    <div className='flex flex-wrap gap-2'>
                                        {project.deployment_links.map((link, index) => (
                                            <a
                                                key={index}
                                                href={link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                                </svg>
                                                Deployment {index + 1}
                                            </a>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-sm">No deployment links available</p>
                                )}
                            </div>

                            {/* Source Code Links Section */}
                            <div>
                                <h3 className='flex items-center gap-2 font-medium text-gray-700 mb-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                    Source Code
                                </h3>
                                {project?.source_code_links?.length > 0 ? (
                                    <div className='flex flex-wrap gap-2'>
                                        {project.source_code_links.map((link, index) => (
                                            <a
                                                key={index}
                                                href={link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                                </svg>
                                                Source {index + 1}
                                            </a>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-sm">No source code links available</p>
                                )}
                            </div>
                        </div>

                        {/* Tasks Section with proper scrolling */}
                        <div className='bg-white p-4 rounded-lg border border-gray-200 flex flex-col overflow-hidden'>
                            <h2 className='font-semibold text-xl text-gray-800 mb-4'>Tasks</h2>
                            <div className='flex-1 overflow-y-auto max-h-52'>
                                {project?.tasks?.length > 0 ? (
                                    <div className='space-y-3 pr-2'>
                                        {project.tasks.map(task => (
                                            <div key={task.$id} className='p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-all'>
                                                <div className='flex items-start gap-3'>
                                                    <div className={`p-1 rounded-full ${task.status === 'Completed' ? 'bg-green-50' : task.status === 'Important' ? 'bg-red-50' : task.status === 'In Progress' ? 'bg-blue-50' : 'bg-yellow-50'}`}>
                                                        {statusIcons[task.status] || <Clock className="text-gray-500" size={16} />}
                                                    </div>
                                                    <div className='flex-1 min-w-0'>
                                                        <div className='flex justify-between items-start'>
                                                            <h3 className='font-medium text-gray-900'>{task.title}</h3>
                                                            {task.priority && (
                                                                <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
                                                                    {task.priority}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className='text-sm text-gray-500 mt-1'>{task.description}</p>
                                                        <div className='flex items-center justify-between mt-2 pt-2 border-t border-gray-100 text-xs'>
                                                            <div className='text-gray-500'>
                                                                Due: {format(new Date(task.due_date), 'MMM d, yyyy')}
                                                            </div>
                                                            {task.assigned_by && (
                                                                <div className='text-gray-500'>
                                                                    Assigned by: {task.assigned_by.name}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className='text-gray-500'>No tasks found for this project</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right sidebar (1 column on lg screens) */}
                    <div className='lg:col-span-1'>
                        <div className='bg-white p-4 rounded-lg border border-gray-200 sticky h-fit'>
                            <h2 className='font-semibold text-lg text-gray-800 mb-4'>Members</h2>

                            <div className='overflow-y-auto h-fit max-h-[26rem]'>
                                {project?.members?.length > 0 ? (
                                    <div className='space-y-3'>
                                        {project.members.map(member => (
                                            <div key={member.$id} className='flex items-center gap-3'>
                                                <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center'>
                                                    {member.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className='font-medium text-gray-900'>{member.name}</p>
                                                    <p className='text-xs text-gray-500'>{member.occupation}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className='text-gray-500'>No members found</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}