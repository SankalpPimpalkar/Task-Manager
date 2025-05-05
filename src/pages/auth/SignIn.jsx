import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Lock, LogIn } from 'lucide-react'

export default function SignIn() {
    return (
        <div className='w-full max-w-lg border border-[#1d1f29] bg-[#11131e] rounded-lg p-8'>
            <h1 className='text-2xl font-bold text-white mb-2'>Welcome Back</h1>
            <p className='text-[#8a8d9b] mb-6'>Sign in to continue managing your tasks</p>

            <form className='space-y-4'>
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
                            placeholder='you@example.com'
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
                    <span>Sign In</span>
                    <LogIn className='w-5 h-5 ml-2' />
                </button>
            </form>

            <div className='mt-6 text-start'>
                <p className='text-[#8a8d9b]'>
                    Don’t have an account?{' '}
                    <Link to="/auth/register" className='text-emerald-400 hover:text-emerald-300 transition-colors'>
                        Register
                    </Link>
                </p>
            </div>
        </div>
    )
}
