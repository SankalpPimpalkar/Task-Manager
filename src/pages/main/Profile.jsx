import React from 'react'
import { UserRound, Mail, Calendar, Briefcase, MapPin, Link, Edit } from 'lucide-react'
import { Link as Navlink } from 'react-router-dom'

export default function Profile() {
    return (
        <div className='border border-[#1d1f29] bg-[#11131e] p-5 col-span-4 rounded-md'>
            <div className='flex justify-between items-start mb-8'>
                <h1 className='text-2xl font-bold text-white'>
                    Profile
                </h1>
                <Navlink to={'/edit-profile'} className='flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2a2d3a] bg-[#1d1f29] text-[#d1d5db] hover:bg-[#2a2d3a] hover:text-white transition-colors duration-200'>
                    <Edit size={18} />
                    Edit Profile
                </Navlink>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
                {/* Profile Card */}
                <div className='md:col-span-1 border border-[#1d1f29] bg-[#1a1c27] rounded-lg p-5 flex flex-col items-center'>
                    <div className='relative mb-4'>
                        <img 
                            className='rounded-full w-32 h-32 object-cover border-2 border-[#3a3d4d]'
                            src='https://img.lovepik.com/free-png/20210926/lovepik-cartoon-avatar-png-image_401440477_wh1200.png'
                            alt='Profile'
                        />
                        <div className='absolute bottom-0 right-0 bg-emerald-500 rounded-full p-1.5 border-2 border-[#1a1c27]'>
                            <div className='w-6 h-6 rounded-full bg-emerald-400 flex items-center justify-center'>
                                <Edit size={12} className='text-[#1a1c27]' />
                            </div>
                        </div>
                    </div>
                    
                    <h2 className='text-xl font-semibold text-white mb-1'>Sankalp Pimpalkar</h2>
                    <p className='text-[#8a8d9b] text-sm mb-4'>@Shanky</p>
                    
                    <div className='w-full border-t border-[#1d1f29] pt-4'>
                        <div className='flex justify-between text-sm mb-2'>
                            <span className='text-[#8a8d9b]'>Tasks Completed</span>
                            <span className='text-white font-medium'>142</span>
                        </div>
                        <div className='flex justify-between text-sm mb-2'>
                            <span className='text-[#8a8d9b]'>Projects</span>
                            <span className='text-white font-medium'>8</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-[#8a8d9b]'>Member Since</span>
                            <span className='text-white font-medium'>2022</span>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className='md:col-span-3'>
                    <div className='border border-[#1d1f29] bg-[#1a1c27] rounded-lg p-5 mb-6'>
                        <h3 className='text-lg font-semibold text-white mb-6'>Personal Information</h3>
                        
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className='flex items-start gap-3'>
                                <div className='p-2 rounded-lg bg-[#1d1f29] text-blue-400'>
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <p className='text-[#8a8d9b] text-sm'>Email</p>
                                    <p className='text-white'>sankalp@example.com</p>
                                </div>
                            </div>
                            
                            <div className='flex items-start gap-3'>
                                <div className='p-2 rounded-lg bg-[#1d1f29] text-purple-400'>
                                    <Calendar size={18} />
                                </div>
                                <div>
                                    <p className='text-[#8a8d9b] text-sm'>Joined Date</p>
                                    <p className='text-white'>15 March 2022</p>
                                </div>
                            </div>
                            
                            <div className='flex items-start gap-3'>
                                <div className='p-2 rounded-lg bg-[#1d1f29] text-amber-400'>
                                    <Briefcase size={18} />
                                </div>
                                <div>
                                    <p className='text-[#8a8d9b] text-sm'>Occupation</p>
                                    <p className='text-white'>Frontend Developer</p>
                                </div>
                            </div>
                            
                            <div className='flex items-start gap-3'>
                                <div className='p-2 rounded-lg bg-[#1d1f29] text-rose-400'>
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p className='text-[#8a8d9b] text-sm'>Location</p>
                                    <p className='text-white'>Mumbai, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bio Section */}
                    <div className='border border-[#1d1f29] bg-[#1a1c27] rounded-lg p-5 mb-6'>
                        <h3 className='text-lg font-semibold text-white mb-4'>About</h3>
                        <p className='text-[#d1d5db]'>
                            Passionate frontend developer with expertise in React and modern JavaScript. 
                            I love creating intuitive user interfaces and solving complex problems. 
                            When not coding, you can find me hiking or reading sci-fi novels.
                        </p>
                    </div>

                    {/* Links Section */}
                    <div className='border border-[#1d1f29] bg-[#1a1c27] rounded-lg p-5 mb-16 md:mb-0'>
                        <h3 className='text-lg font-semibold text-white mb-4'>Links</h3>
                        <div className='gap-5 grid grid-cols-2'>
                            <a href='#' className='flex items-center gap-3 text-[#d1d5db] hover:text-blue-400 transition-colors'>
                                <Link size={16} className='text-blue-400' />
                                <span>portfolio-sankalp.example.com</span>
                            </a>
                            <a href='#' className='flex items-center gap-3 text-[#d1d5db] hover:text-blue-400 transition-colors'>
                                <Link size={16} className='text-blue-400' />
                                <span>github.com/sankalp</span>
                            </a>
                            <a href='#' className='flex items-center gap-3 text-[#d1d5db] hover:text-blue-400 transition-colors'>
                                <Link size={16} className='text-blue-400' />
                                <span>linkedin.com/in/sankalp</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}