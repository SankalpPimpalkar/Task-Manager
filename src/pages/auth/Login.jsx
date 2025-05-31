import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import appwrite from '../../api';
import { useTransition } from 'react';

export default function Login() {

    const [isPendingLogin, startLoginTransition] = useTransition()
    const navigate = useNavigate()

    function handleSubmitLoginForm(event) {
        event.preventDefault()
        const form = new FormData(event.target)
        const data = Object.fromEntries(form.entries())

        startLoginTransition(async () => {
            const resp = await appwrite.LOGIN_ACCOUNT(data)
            if (resp) {
                navigate('/')
            }
        })
    }

    return (
        <div className="w-full max-w-md p-5 sm:mx-5 bg-white sm:border border-gray-200 rounded-lg sm:shadow space-y-6">
            <header className='space-y-2'>
                <h2 className="text-xl tracking-wide font-bold text-gray-600">
                    Login Account
                </h2>

                <p className='text-xs text-gray-400'>
                    Welcome back! Log in to continue managing your work and staying on top of your goals.
                </p>
            </header>

            <form onSubmit={handleSubmitLoginForm} className="w-full space-y-2">
                <InputField
                    type='email'
                    placeholder={'Email'}
                    name={'email'}
                />
                <InputField
                    type='password'
                    placeholder={'Password'}
                    name={'password'}
                />

                <div className='flex items-center justify-end gap-2'>
                    <Button
                        type='reset'
                        className={'border-gray-200 bg-white text-gray-500'}
                    >
                        Clear
                    </Button>
                    <Button loading={isPendingLogin} type='submit' className='text-white'>
                        Submit
                    </Button>
                </div>
            </form>

            <p className='text-sm text-gray-500'>
                New user ? {' '}
                <Link to={'/auth/register'} className='font-semibold text-blue-500 hover:underline'>
                    Create Account
                </Link>
            </p>
        </div>
    );
}
