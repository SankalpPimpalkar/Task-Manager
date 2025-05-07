import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { LOGIN_ACCOUNT } from '../../appwrite/auth';
import { loginUser } from '../../redux/slices/auth.slice';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false); // 🔄 Loader state
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoggingIn(true);
        console.log('Sign In Submitted:', { email, password });

        try {
            const resp = await LOGIN_ACCOUNT({ email, password });

            if (resp) {
                dispatch(loginUser(resp));
                navigate('/');
            }
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <div className='w-full max-w-lg border border-[#1d1f29] bg-[#11131e] rounded-lg p-8'>
            <h1 className='text-2xl font-bold text-white mb-2'>Welcome Back</h1>
            <p className='text-[#8a8d9b] mb-6'>Sign in to continue managing your tasks</p>

            <form className='space-y-4' onSubmit={handleSubmit} aria-busy={isLoggingIn}>
                {/* Email */}
                <div>
                    <label className='block text-[#d1d5db] text-sm mb-2'>Email</label>
                    <div className='relative'>
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <Mail className='w-5 h-5 text-[#8a8d9b]' />
                        </div>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full pl-10 pr-4 py-2 rounded-lg border border-[#1d1f29] bg-[#1a1c27] text-white focus:border-[#3a3d4d] focus:outline-none'
                            placeholder='you@example.com'
                            required
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full pl-10 pr-4 py-2 rounded-lg border border-[#1d1f29] bg-[#1a1c27] text-white focus:border-[#3a3d4d] focus:outline-none'
                            placeholder='••••••••'
                            required
                        />
                    </div>
                </div>

                <button
                    type='submit'
                    disabled={isLoggingIn}
                    className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-white transition-colors duration-200 cursor-pointer 
                        ${isLoggingIn ? 'bg-emerald-800 cursor-not-allowed' : 'bg-emerald-700 hover:bg-emerald-600'}`}
                >
                    <span>{isLoggingIn ? 'Signing In...' : 'Sign In'}</span>
                    {
                        isLoggingIn
                            ? <Loader2 className='w-5 h-5 ml-2 animate-spin' />
                            : <LogIn className='w-5 h-5 ml-2' />
                    }
                </button>
            </form>

            <div className='mt-6 text-start'>
                <p className='text-start text-sm text-[#8a8d9b]'>
                    Don’t have an account?{' '}
                    <Link to="/auth/register" className='text-emerald-500 hover:underline'>
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
