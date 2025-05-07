import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GET_ACCOUNT } from '../../appwrite/auth'
import { loginUser } from '../../redux/slices/auth.slice'

export default function MainLayout() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const cookieFallback =
        localStorage.getItem('cookieFallback') != '[]' &&
        localStorage.getItem('cookieFallback')

    useEffect(() => {
        if (isAuthenticated) {
            return
        }

        if (cookieFallback) {
            ; (async () => {
                const resp = await GET_ACCOUNT()
                if (resp) {
                    dispatch(loginUser(resp))
                    return
                }
                navigate('/auth/signin')
                return
            })()
        } else {
            navigate('/auth/signin')
            return
        }
    }, [navigate])

    return (
        <div className='w-full min-h-dvh bg-[#030712] text-white'>
            <div className='container mx-auto md:p-5'>
                <div className='flex flex-col md:grid md:grid-cols-5 md:gap-5 w-full min-h-[calc(100dvh-40px)]'>
                    <div className='w-full md:col-span-1'>
                        <Sidebar />
                    </div>
                    <main className='w-full md:col-span-4'>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    )
}
