import React, { useEffect, useState, useTransition } from 'react'
import Button from '../../components/Button'
import { GET_ACCOUNT, LOGOUT_ACCOUNT } from '../../appwrite/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Home() {

    const [isPendingLogout, startPendingLogoutTransition] = useTransition()
    const [isPendingUser, startPendingUserTransition] = useTransition()
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()
        startPendingLogoutTransition(async () => {
            const resp = await LOGOUT_ACCOUNT()

            if (resp) {
                toast('User logged out successfully')
                navigate('/auth/signin')
            }
        })
    }

    function handleFetchUser() {
        startPendingUserTransition(async () => {
            const resp = await GET_ACCOUNT()

            if (resp) {
                setUser(resp)
                console.log(resp.name)
                toast('User data fetched successfully')
            }
        })
    }

    useEffect(() => {
        handleFetchUser()
    }, [])

    return (
        <div className='text-black p-10 flex flex-col gap-5 items-center justify-center w-full min-h-dvh'>
            <p className='text-black'>
                {user?.name}
            </p>
            <Button type='button' onClick={handleSubmit} isLoading={isPendingLogout}>
                Logout
            </Button>
        </div>
    )
}
