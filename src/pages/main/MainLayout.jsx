import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import { GET_ACCOUNT } from "../../appwrite/auth"
import { loginUser } from "../../redux/slices/auth.slice"

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
                    console.log("User Authenticated")
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
        <div className='flex items-center justify-center w-full min-h-dvh'>
            <Outlet />
        </div>
    )
}
