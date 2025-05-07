import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function AuthLayout() {

    const navigate = useNavigate()
    const cookieFallback =
        localStorage.getItem('cookieFallback') != '[]' &&
        localStorage.getItem('cookieFallback')

    useEffect(() => {
        if (cookieFallback) {
            navigate('/')
            return
        }
    }, [navigate])

    return (
        <div className='w-full min-h-dvh bg-[#030712] text-white flex items-center justify-center'>
            <Outlet />
        </div>
    )
}
