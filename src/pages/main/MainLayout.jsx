import { useEffect, useState, useTransition } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import { GET_ACCOUNT } from "../../appwrite/auth"
import { loginUser } from "../../redux/slices/auth.slice"
import Sidebar from "../../components/Sidebar"
import { PanelRightClose } from "lucide-react"
import Default from "../../components/loaders/Default"

export default function MainLayout() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const [isPendingUser, startPendingUserTransition] = useTransition()
    const [user, setUser] = useState(null)

    const cookieFallback =
        localStorage.getItem('cookieFallback') != '[]' &&
        localStorage.getItem('cookieFallback')

    useEffect(() => {
        if (isAuthenticated) {
            return
        }

        if (cookieFallback) {
            function handleFetchUser() {
                startPendingUserTransition(async () => {
                    const resp = await GET_ACCOUNT()

                    if (resp) {
                        setUser(resp)
                        dispatch(loginUser(resp))
                        console.log(resp.name)
                    }
                })
            }
            handleFetchUser()
        } else {
            navigate('/auth/signin')
            return
        }
    }, [navigate])

    if (isPendingUser) {
        return (
            <Default />
        )
    }

    return (
        <div className='flex w-full h-full min-h-dvh md:divide-x divide-gray-100 bg-gray-100'>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="p-4 w-full max-h-dvh space-y-4">
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(true)}
                >
                    <PanelRightClose size={24} className="text-gray-500 stroke-[1.5]" />
                </button>
                <div className="h-full max-h-[90vh] overflow-y-auto">
                <Outlet />
                </div>
            </div>
        </div>
    )
}