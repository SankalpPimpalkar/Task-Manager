import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import useAuth from '../hooks/useAuth'
import Header from '../components/Header'

export default function MainLayout() {

    const { FetchUser, isloading, user } = useAuth()

    useEffect(() => {
        FetchUser()
    }, [])

    console.log(user)

    if (isloading) {
        return (
            <div className='w-full min-h-dvh flex items-center justify-center'>
                <LoaderCircle size={50} className='text-blue-500 stroke-2 animate-spin' />
            </div>
        )
    }

    return (
        <div className='w-full min-h-dvh flex flex-col'>
            <Header />
            <div className='w-full max-w-6xl mx-auto p-4'>
                <Outlet />
            </div>
        </div>
    )
}
