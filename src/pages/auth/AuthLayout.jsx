import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

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
        <div className="w-full min-h-dvh flex items-center justify-center sm:bg-gray-50">
            <Outlet />
        </div>
    )
}
