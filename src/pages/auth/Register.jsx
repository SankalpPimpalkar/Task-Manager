import React from 'react'
import { Link } from 'react-router-dom'
import { UserRound, Mail, Lock, ArrowRight } from 'lucide-react'

export default function Register() {
    return (
        <div className='w-full max-w-lg border border-[#1d1f29] bg-[#11131e] rounded-lg p-8'>
            <h1 className='text-2xl font-bold text-white mb-2'>Create Account</h1>
            <p className='text-[#8a8d9b] mb-6'>Get started with your task management</p>

            <form className='space-y-4'>
                {/* Full Name */}
                <div>
                    <label className='block text-[#d1d5db] text-sm mb-2'>Full Name</label>
                    <div className='relative'>
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <UserRound className='w-5 h-5 text-[#8a8d9b]' />
                        </div>
                        <input
                            type='text'
                            className='w-full pl-10 pr-4 py-2 rounded-lg border border-[#1d1f29] bg-[#1a1c27] text-white focus:border-[#3a3d4d] focus:outline-none'
                            placeholder='John Doe'
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className='block text-[#d1d5db] text-sm mb-2'>Email</label>
                    <div className='relative'>
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <Mail className='w-5 h-5 text-[#8a8d9b]' />
                        </div>
                        <input
                            type='email'
                            className='w-full pl-10 pr-4 py-2 rounded-lg border border-[#1d1f29] bg-[#1a1c27] text-white focus:border-[#3a3d4d] focus:outline-none'
                            placeholder='john@example.com'
                        />
                    </div>
                </div>

                {/* Username */}
                <div>
                    <label className='block text-[#d1d5db] text-sm mb-2'>Username</label>
                    <div className='relative'>
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <UserRound className='w-5 h-5 text-[#8a8d9b]' />
                        </div>
                        <input
                            type='text'
                            className='w-full pl-10 pr-4 py-2 rounded-lg border border-[#1d1f29] bg-[#1a1c27] text-white focus:border-[#3a3d4d] focus:outline-none'
                            placeholder='johndoe'
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label className='block text-[#d1d5db] text-sm mb-2'>Password</label>
                    <div className='relative'>
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <Lock className='w-5 h-5 text-[#8a8d9b]' />
                        </div>
                        <input
                            type='password'
                            className='w-full pl-10 pr-4 py-2 rounded-lg border border-[#1d1f29] bg-[#1a1c27] text-white focus:border-[#3a3d4d] focus:outline-none'
                            placeholder='••••••••'
                        />
                    </div>
                </div>

                <button
                    type='submit'
                    className='w-full flex justify-center items-center py-3 px-4 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors duration-200'
                >
                    <span>Register</span>
                    <ArrowRight className='w-5 h-5 ml-2' />
                </button>
            </form>

            <div className='mt-6 text-start'>
                <p className='text-[#8a8d9b]'>
                    Already have an account?{' '}
                    <Link to="/auth/signin" className='text-emerald-400 hover:text-emerald-300 transition-colors'>
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}
