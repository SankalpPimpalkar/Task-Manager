import React from 'react'
import { UserRound, Mail, Calendar, Briefcase, MapPin, Link, ChevronLeft, Check, Upload } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function EditProfile() {
    const navigate = useNavigate()

    return (
        <div className='border border-[#1d1f29] bg-[#11131e] p-5 col-span-4 rounded-md'>
            {/* Header with back button */}
            <div className='flex justify-between items-center mb-8'>
                <button
                    onClick={() => navigate(-1)}
                    className='flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2a2d3a] bg-[#1d1f29] text-[#d1d5db] hover:bg-[#2a2d3a] hover:text-white transition-colors duration-200'
                >
                    <ChevronLeft size={18} />
                    Back
                </button>
                <h1 className='text-2xl font-bold text-white'>
                    Edit Profile
                </h1>
                <button className='flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-700 text-white hover:bg-emerald-600 transition-colors duration-200'>
                    <Check size={18} strokeWidth={3} />
                    Save Changes
                </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
                {/* Profile Picture Section */}
                <div className='md:col-span-1 border border-[#1d1f29] bg-[#1a1c27] rounded-lg p-5 flex flex-col items-center h-fit'>
                    <div className='relative mb-4 group'>
                        <img
                            className='rounded-full w-32 h-32 object-cover border-2 border-[#3a3d4d] group-hover:opacity-80 transition-opacity'
                            src='https://img.lovepik.com/free-png/20210926/lovepik-cartoon-avatar-png-image_401440477_wh1200.png'
                            alt='Profile'
                        />
                        <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                            <label className='cursor-pointer flex flex-col items-center'>
                                <div className='bg-[#1d1f29]/90 rounded-full p-3 mb-1'>
                                    <Upload size={20} className='text-white' />
                                </div>
                                <span className='text-xs text-white bg-[#1d1f29]/90 px-2 py-1 rounded'>Change Photo</span>
                                <input type='file' className='hidden' />
                            </label>
                        </div>
                    </div>
                    <button className='text-rose-400 hover:text-rose-300 text-sm'>
                        Remove Photo
                    </button>
                </div>

                {/* Form Section */}
                <div className='md:col-span-3 overflow-y-auto h-[calc(100dvh-160px)]'>
                    <div className='border border-[#1d1f29] bg-[#1a1c27] rounded-lg p-6 mb-6'>
                        <h3 className='text-lg font-semibold text-white mb-6'>Basic Information</h3>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                            <div>
                                <label className='block text-[#8a8d9b] text-sm mb-2'>First Name</label>
                                <input
                                    type='text'
                                    defaultValue="Sankalp"
                                    className='w-full px-4 py-2 rounded-lg border border-[#1d1f29] bg-[#11131e] text-white focus:border-[#3a3d4d] focus:outline-none'
                                />
                            </div>
                            <div>
                                <label className='block text-[#8a8d9b] text-sm mb-2'>Last Name</label>
                                <input
                                    type='text'
                                    defaultValue="Pimpalkar"
                                    className='w-full px-4 py-2 rounded-lg border border-[#1d1f29] bg-[#11131e] text-white focus:border-[#3a3d4d] focus:outline-none'
                                />
                            </div>
                            <div>
                                <label className='block text-[#8a8d9b] text-sm mb-2'>Username</label>
                                <input
                                    type='text'
                                    defaultValue="Shanky"
                                    className='w-full px-4 py-2 rounded-lg border border-[#1d1f29] bg-[#11131e] text-white focus:border-[#3a3d4d] focus:outline-none'
                                />
                            </div>
                            <div>
                                <label className='block text-[#8a8d9b] text-sm mb-2'>Email</label>
                                <input
                                    type='email'
                                    defaultValue="sankalp@example.com"
                                    className='w-full px-4 py-2 rounded-lg border border-[#1d1f29] bg-[#11131e] text-white focus:border-[#3a3d4d] focus:outline-none'
                                />
                            </div>
                        </div>

                        <h3 className='text-lg font-semibold text-white mb-6'>Additional Information</h3>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div>
                                <label className='block text-[#8a8d9b] text-sm mb-2'>Occupation</label>
                                <input
                                    type='text'
                                    defaultValue="Frontend Developer"
                                    className='w-full px-4 py-2 rounded-lg border border-[#1d1f29] bg-[#11131e] text-white focus:border-[#3a3d4d] focus:outline-none'
                                />
                            </div>
                            <div>
                                <label className='block text-[#8a8d9b] text-sm mb-2'>Location</label>
                                <input
                                    type='text'
                                    defaultValue="Mumbai, India"
                                    className='w-full px-4 py-2 rounded-lg border border-[#1d1f29] bg-[#11131e] text-white focus:border-[#3a3d4d] focus:outline-none'
                                />
                            </div>
                            <div className='md:col-span-2'>
                                <label className='block text-[#8a8d9b] text-sm mb-2'>Bio</label>
                                <textarea
                                    rows={4}
                                    defaultValue="Passionate frontend developer with expertise in React and modern JavaScript. I love creating intuitive user interfaces and solving complex problems."
                                    className='w-full px-4 py-2 rounded-lg border border-[#1d1f29] bg-[#11131e] text-white focus:border-[#3a3d4d] focus:outline-none'
                                />
                            </div>
                        </div>
                    </div>

                    {/* Social Links Section */}
                    <div className='border border-[#1d1f29] bg-[#1a1c27] rounded-lg p-5'>
                        <h3 className='text-lg font-semibold text-white mb-6'>Social Links</h3>
                        <div className='space-y-4'>
                            <div>
                                <label className='block text-[#8a8d9b] text-sm mb-2'>Portfolio Website</label>
                                <div className='flex'>
                                    <span className='inline-flex items-center px-4 py-2 rounded-l-lg border border-r-0 border-[#1d1f29] bg-[#1d1f29] text-[#8a8d9b]'>
                                        <Link size={16} className='text-blue-400' />
                                    </span>
                                    <input
                                        type='url'
                                        placeholder='https://yourportfolio.example.com'
                                        className='flex-1 px-4 py-2 rounded-r-lg border border-[#1d1f29] bg-[#11131e] text-white focus:border-[#3a3d4d] focus:outline-none'
                                    />
                                </div>
                            </div>
                            <div>
                                <label className='block text-[#8a8d9b] text-sm mb-2'>GitHub</label>
                                <div className='flex'>
                                    <span className='inline-flex items-center px-4 py-2 rounded-l-lg border border-r-0 border-[#1d1f29] bg-[#1d1f29] text-[#8a8d9b]'>
                                        <Link size={16} className='text-blue-400' />
                                    </span>
                                    <input
                                        type='url'
                                        placeholder='https://github.com/username'
                                        className='flex-1 px-4 py-2 rounded-r-lg border border-[#1d1f29] bg-[#11131e] text-white focus:border-[#3a3d4d] focus:outline-none'
                                    />
                                </div>
                            </div>
                            <div>
                                <label className='block text-[#8a8d9b] text-sm mb-2'>LinkedIn</label>
                                <div className='flex'>
                                    <span className='inline-flex items-center px-4 py-2 rounded-l-lg border border-r-0 border-[#1d1f29] bg-[#1d1f29] text-[#8a8d9b]'>
                                        <Link size={16} className='text-blue-400' />
                                    </span>
                                    <input
                                        type='url'
                                        placeholder='https://linkedin.com/in/username'
                                        className='flex-1 px-4 py-2 rounded-r-lg border border-[#1d1f29] bg-[#11131e] text-white focus:border-[#3a3d4d] focus:outline-none'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}