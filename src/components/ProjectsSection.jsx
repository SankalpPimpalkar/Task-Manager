import React from 'react'
import { Link } from 'react-router-dom'

export default function ProjectsSection() {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2'>
            {
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(project => (
                    <Link to={`/projects/${project}`} key={project} className='border border-gray-300 p-4 bg-gray-50 rounded-md space-y-2'>
                        <h5 className='font-semibold text-gray-700'>
                            Project Title
                        </h5>

                        <p className='text-gray-500 text-sm'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, obcaecati.
                        </p>

                        <div className='w-full flex items-center justify-between'>
                            <p className='text-sm text-gray-600'>
                                0/6
                            </p>

                            <div className="flex -space-x-2">
                                {
                                    [1, 2, 3].map((member) => (
                                        <img
                                            key={member}
                                            className="w-6 h-6 aspect-square rounded-full border border-white"
                                            src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="
                                            alt="profile"
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}
