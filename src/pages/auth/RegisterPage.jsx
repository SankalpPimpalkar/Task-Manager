import { User, Mail, Lock, Briefcase } from 'lucide-react'
import Button from '../../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../../components/InputField'
import { useState, useTransition } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../redux/slices/auth.slice'
import { toast } from 'react-toastify'
import { CREATE_ACCOUNT } from '../../appwrite/auth'

export default function RegisterPage() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isPending, startTransition] = useTransition()
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        occupation: ''
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
            const resp = await CREATE_ACCOUNT(formData)

            if (resp) {
                dispatch(loginUser(resp))
                toast('User registered successfully')
                handleClear()
                navigate('/')
            }
        })
    }

    function handleClear() {
        setFormData({
            name: '',
            username: '',
            email: '',
            password: '',
            occupation: ''
        })
    }

    return (
        <div className='sm:border border-gray-200 p-6 rounded w-full max-w-md space-y-4 bg-white'>
            <div className="space-y-1">
                <h1 className='font-bold text-lg'>Create Account</h1>
                <p className='text-xs text-gray-500'>
                    Create your account to get started with task management.
                </p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-3'>
                {/* Name */}
                <InputField
                    type='text'
                    id={'name'}
                    label={'Name'}
                    placeholder={'John Doe'}
                    icon={User}
                    value={formData.name}
                    onChange={handleChange}
                />

                {/* Username */}
                <InputField
                    type='text'
                    id={'username'}
                    label={'Username'}
                    placeholder={'johndoe123'}
                    icon={User}
                    value={formData.username}
                    onChange={handleChange}
                />

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

                {/* Occupation */}
                <InputField
                    type='text'
                    id={'occupation'}
                    label={'Occupation'}
                    placeholder={'Software Engineer'}
                    icon={Briefcase}
                    value={formData.occupation}
                    onChange={handleChange}
                />

                {/* Submit Button */}
                <div className='flex flex-row-reverse gap-1.5'>
                    <Button isLoading={isPending} className='active:bg-gray-800'>
                        Sign Up
                    </Button>
                    <Button type='button' className='bg-white border border-gray-300 text-gray-500 active:bg-gray-50' onClick={handleClear}>
                        Clear
                    </Button>
                </div>
            </form>

            <p className='text-xs text-gray-500'>
                Already have an account? {' '}
                <Link className='text-black font-semibold' to={'/auth/signin'}>
                    Login
                </Link>
            </p>
        </div>
    )
}
