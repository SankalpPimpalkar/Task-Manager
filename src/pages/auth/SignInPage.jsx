import Button from '../../components/ui/Button'
import { Lock, Mail } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../../components/ui/InputField'
import { useState, useTransition } from 'react'
import { useDispatch } from 'react-redux'
import { LOGIN_ACCOUNT } from '../../appwrite/auth'
import { loginUser } from '../../redux/slices/auth.slice'
import { toast } from 'react-toastify'

export default function SignInPage() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isPending, startTransition] = useTransition()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    function handleChange(event) {
        console.log(event)
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        startTransition(async () => {
            const resp = await LOGIN_ACCOUNT(formData)

            if (resp) {
                dispatch(loginUser(resp))
                toast('User logged in successfully')
                handleClear()
                navigate('/')
            }
        })
    }

    function handleClear() {
        setFormData({
            email: '',
            password: ''
        })
    }

    return (
        <div className='sm:border border-gray-200 p-6 rounded w-full max-w-md space-y-4 bg-white'>
            <div className="space-y-1">
                <h1 className='font-bold text-lg'>Login Account</h1>
                <p className='text-xs text-gray-500'>
                    Welcome back! Enter your details to continue managing your tasks.
                </p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-3'>
                {/* Email */}
                <InputField
                    type='email'
                    id={'email'}
                    label={'Email'}
                    placeholder={'email@example.com'}
                    icon={Mail}
                    value={formData.email}
                    onChange={handleChange}
                />

                {/* Password */}
                <InputField
                    type='password'
                    id={'password'}
                    label={'Password'}
                    placeholder={'••••••••'}
                    icon={Lock}
                    value={formData.password}
                    onChange={handleChange}
                />

                {/* Submit Button */}
                <div className='flex flex-row-reverse gap-1.5'>
                    <Button isLoading={isPending} className='active:bg-gray-800'>
                        Login
                    </Button>
                    <Button type='button' className='bg-white border border-gray-300 text-gray-500 active:bg-gray-50' onClick={handleClear}>
                        Clear
                    </Button>
                </div>
            </form>

            <p className='text-xs text-gray-500'>
                Don't have an account yet ? {' '}
                <Link className='text-black font-semibold' to={'/auth/register'}>
                    Create Account
                </Link>
            </p>
        </div>
    )
}
