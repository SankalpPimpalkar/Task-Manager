import React, { useEffect, useState } from 'react'
import { UserRound, Mail, Calendar, Briefcase, MapPin, Link as LinkIcon, Edit, GitBranch, Folder, FileText } from 'lucide-react'
import { Link, Link as NavLink, useParams } from 'react-router-dom'
import { GET_USER_BY_ID } from '../../appwrite/database'
import { useSelector } from 'react-redux'
import getRelativeTimeFromNow from '../../helpers/getRelativeTimeFromNow'

function formatDate(isoString) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export default function Profile() {
    const { id } = useParams()
    const currentUser = useSelector(state => state.auth.user)
    const [isLoading, setIsLoading] = useState(true)
    const [profile, setProfile] = useState(null)

    const fetchProfile = async () => {
        try {
            const resp = await GET_USER_BY_ID(id)
            setProfile(resp)
        } catch (error) {
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [id])

    // Calculate completed tasks across all projects
    const completedTasksCount = profile?.assigned_tasks?.filter(task => task.status === 'Completed').length || 0
    const totalProjectsCount = profile?.projects?.length || 0

    return (
        <div className='border border-[#1d1f29] bg-[#11131e] p-5 col-span-4 rounded-md md:h-[calc(100dvh-40px)]'>
            <div className='flex justify-between items-start mb-8'>
                <h1 className='text-2xl font-bold text-white'>
                    Profile
                </h1>
                {currentUser?.$id === profile?.$id && (
                    <NavLink to={'/edit-profile'} className='flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2a2d3a] bg-[#1d1f29] text-[#d1d5db] hover:bg-[#2a2d3a] hover:text-white transition-colors duration-200'>
                        <Edit size={18} />
                        Edit Profile
                    </NavLink>
                )}
            </div>

            {isLoading ? (
                <div className="animate-pulse">
                    <div className="h-8 bg-[#1d1f29] rounded w-1/4 mb-8"></div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="md:col-span-1 h-96 bg-[#1a1c27] rounded-lg"></div>
                        <div className="md:col-span-3 space-y-6">
                            <div className="h-48 bg-[#1a1c27] rounded-lg"></div>
                            <div className="h-32 bg-[#1a1c27] rounded-lg"></div>
                            <div className="h-32 bg-[#1a1c27] rounded-lg"></div>
                        </div>
                    </div>
                </div>
            ) : profile ? (
                <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
                    {/* Profile Card */}
                    <div className='md:col-span-1 border border-[#1d1f29] bg-[#1a1c27] rounded-lg p-5 flex flex-col items-center h-fit'>
                        <div className='relative mb-4'>
                            <img
                                className='rounded-full w-32 h-32 object-cover border-2 border-[#3a3d4d]'
                                src={profile?.avatar || "https://img.lovepik.com/free-png/20210926/lovepik-cartoon-avatar-png-image_401440477_wh1200.png"}
                                alt="avatar"
                            />
                            {currentUser?.$id === profile.$id && (
                                <div className='absolute bottom-0 right-0 bg-emerald-500 rounded-full p-1.5 border-2 border-[#1a1c27]'>
                                    <div className='w-6 h-6 rounded-full bg-emerald-400 flex items-center justify-center'>
                                        <Edit size={12} className='text-[#1a1c27]' />
                                    </div>
                                </div>
                            )}
                        </div>

                        <h2 className='text-xl font-semibold text-white mb-1'>{profile.name}</h2>
                        <p className='text-[#8a8d9b] text-sm mb-4'>@{profile.username}</p>

                        <div className='w-full border-t border-[#1d1f29] pt-4'>
                            <div className='flex justify-between text-sm mb-2'>
                                <span className='text-[#8a8d9b]'>Tasks Completed</span>
                                <span className='text-white font-medium'>{completedTasksCount}</span>
                            </div>
                            <div className='flex justify-between text-sm mb-2'>
                                <span className='text-[#8a8d9b]'>Projects</span>
                                <span className='text-white font-medium'>{totalProjectsCount}</span>
                            </div>
                            <div className='flex justify-between text-sm'>
                                <span className='text-[#8a8d9b]'>Member Since</span>
                                <span className='text-white font-medium'>
                                    {new Date(profile.$createdAt).getFullYear()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className='md:col-span-3 space-y-6 mb-20 md:mb-0 md:h-[calc(100dvh-150px)] overflow-y-auto'>
                        {/* Personal Information */}
                        <div className='border border-[#1d1f29] bg-[#1a1c27] rounded-lg p-5'>
                            <h3 className='text-lg font-semibold text-white mb-6'>Personal Information</h3>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='flex items-start gap-3'>
                                    <div className='p-2 rounded-lg bg-[#1d1f29] text-blue-400'>
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <p className='text-[#8a8d9b] text-sm'>Email</p>
                                        <p className='text-white'>{profile.email}</p>
                                    </div>
                                </div>

                                <div className='flex items-start gap-3'>
                                    <div className='p-2 rounded-lg bg-[#1d1f29] text-purple-400'>
                                        <Calendar size={18} />
                                    </div>
                                    <div>
                                        <p className='text-[#8a8d9b] text-sm'>Joined Date</p>
                                        <p className='text-white'>{formatDate(profile.$createdAt)}</p>
                                    </div>
                                </div>

                                <div className='flex items-start gap-3'>
                                    <div className='p-2 rounded-lg bg-[#1d1f29] text-amber-400'>
                                        <Briefcase size={18} />
                                    </div>
                                    <div>
                                        <p className='text-[#8a8d9b] text-sm'>Occupation</p>
                                        <p className='text-white'>{profile.occupation}</p>
                                    </div>
                                </div>

                                <div className='flex items-start gap-3'>
                                    <div className='p-2 rounded-lg bg-[#1d1f29] text-rose-400'>
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <p className='text-[#8a8d9b] text-sm'>Location</p>
                                        <p className='text-white'>{profile.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bio Section */}
                        <div className='border border-[#1d1f29] bg-[#1a1c27] rounded-lg p-5'>
                            <h3 className='text-lg font-semibold text-white mb-4'>About</h3>
                            <p className='text-[#d1d5db]'>
                                {profile.about || 'No bio provided'}
                            </p>
                        </div>

                        {/* Projects Section */}
                        {profile.projects?.length > 0 && (
                            <div className='border border-[#1d1f29] bg-[#1a1c27] rounded-lg p-5'>
                                <h3 className='text-lg font-semibold text-white mb-4'>Projects</h3>
                                <div className='space-y-4'>
                                    {profile.projects.map(project => (
                                        <Link to={`/projects/${project.$id}`} key={project.$id} className='p-4 bg-[#252833] rounded-lg block'>
                                            <div className='flex justify-between items-start'>
                                                <div>
                                                    <h4 className='text-white font-medium flex items-center'>
                                                        <Folder className='w-5 h-5 mr-2 text-blue-400' />
                                                        {project.title}
                                                    </h4>
                                                    <p className='text-[#b5b7ba] text-sm mt-2'>{project.description}</p>
                                                </div>
                                                <div className='flex items-center text-xs text-purple-400 bg-purple-400/10 px-3 py-1.5 rounded-full'>
                                                    <GitBranch className='w-4 h-4 mr-1' />
                                                    <p className='text-nowrap'>
                                                        {project.tasks?.length || 0} tasks
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='flex items-center justify-between mt-4 text-xs text-[#8a8d9b]'>
                                                <div className="flex items-center">
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    Created {getRelativeTimeFromNow(project.$createdAt)}
                                                </div>
                                                <div className="flex items-center">
                                                    <FileText className="w-4 h-4 mr-1" />
                                                    Last updated {getRelativeTimeFromNow(project.$updatedAt)}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Links Section */}
                        {profile.links?.length > 0 && (
                            <div className='border border-[#1d1f29] bg-[#1a1c27] rounded-lg p-5'>
                                <h3 className='text-lg font-semibold text-white mb-4'>Links</h3>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    {profile.links.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className='flex items-center gap-3 p-3 bg-[#252833] rounded-lg hover:bg-[#2e303d] transition-colors'
                                        >
                                            <div className='p-2 rounded-lg bg-[#1d1f29] text-blue-400'>
                                                <LinkIcon size={18} />
                                            </div>
                                            <div>
                                                <p className='text-white text-sm font-medium'>External Link</p>
                                                <p className='text-[#8a8d9b] text-xs truncate'>{link}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className='text-center text-[#8a8d9b] py-10'>
                    No profile data available
                </div>
            )}
        </div>
    )
}