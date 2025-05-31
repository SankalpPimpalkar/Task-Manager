import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { useTransition } from 'react';
import appwrite from '../../api';

export default function Register() {

    const [isPendingRegisteration, startRegisterationTransition] = useTransition()
    const navigate = useNavigate()

    function handleSubmitRegisterForm(event) {
        event.preventDefault()
        const form = new FormData(event.target)
        const data = Object.fromEntries(form.entries())

        startRegisterationTransition(async () => {
            const resp = await appwrite.CREATE_ACCOUNT(data)
            if (resp) {
                navigate('/')
            }
        })
    }

    return (
        <div className="w-full max-w-md p-5 sm:mx-5 bg-white sm:border border-gray-200 rounded-lg sm:shadow space-y-6">
            <header className='space-y-2'>
                <h2 className="text-xl tracking-wide font-bold text-gray-600">
                    Create Account
                </h2>

                <p className='text-xs text-gray-400'>
                    Start your journey by creating an account. It&apos;s quick, easy, and gets you access to all your tasks and projects.
                </p>
            </header>

            <form onSubmit={handleSubmitRegisterForm} className="w-full space-y-2">
                <InputField
                    placeholder={'Full Name'}
                    name={'name'}
                />
                <InputField
                    placeholder={'Username'}
                    name={'username'}
                />
                <InputField
                    type='email'
                    placeholder={'Email'}
                    name={'email'}
                />
                <InputField
                    type='password'
                    placeholder={'Set a Password'}
                    name={'password'}
                />
                <InputField
                    placeholder={'Occupation'}
                    name={'occupation'}
                />

                <div className='flex items-center justify-end gap-2'>
                    <Button
                        type='reset'
                        className={'border-gray-200 bg-white active:bg-gray-50 text-gray-500'}
                    >
                        Clear
                    </Button>
                    <Button loading={isPendingRegisteration} type='submit' className='text-white'>
                        Submit
                    </Button>
                </div>
            </form>

            <p className='text-sm text-gray-500'>
                Already have an account ? {' '}
                <Link to={'/auth/login'} className='font-semibold text-blue-500 hover:underline'>
                    Login Account
                </Link>
            </p>
        </div>
    );
}
