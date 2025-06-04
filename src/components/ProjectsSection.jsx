import React from 'react'
import { Link } from 'react-router-dom'

export default function ProjectsSection({ projects = [] }) {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2'>
            {
                projects.length > 0 ? projects.map(project => (
                    <Link to={`/projects/${project.$id}`} key={project.$id} className='border border-gray-300 p-4 bg-gray-50 rounded-md space-y-2'>
                        <h5 className='font-semibold text-gray-700'>
                            {project.name}
                        </h5>

                        <p className="text-gray-500 text-sm line-clamp-3" title={project?.description}>
                            {project?.description}
                        </p>

                        <div className='w-full flex items-center justify-between'>
                            <p className='text-sm text-gray-600'>
                                {
                                    project.tasks.filter(task => task.is_completed).length
                                }
                                /
                                {
                                    project.tasks.length
                                }
                            </p>

                            <div className="flex -space-x-2">
                                {
                                    project?.team?.map((member) => (
                                        <img
                                            key={member.$id}
                                            className="w-6 h-6 aspect-square rounded-full border border-white"
                                            src={
                                                member.avatar ||
                                                "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="
                                            }
                                            alt={member.name}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </Link>
                )) : (
                    <p className='text-sm text-gray-400 text-pretty col-span-full'>
                        You haven't created any projects yet.
                    </p>
                )
            }
        </div>
    )
}
