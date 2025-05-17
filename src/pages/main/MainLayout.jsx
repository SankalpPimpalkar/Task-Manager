import { useEffect, useState, useTransition } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import { GET_ACCOUNT } from "../../appwrite/auth"
import { loginUser } from "../../redux/slices/auth.slice"
import Sidebar from "../../components/Sidebar"
import { toast } from "react-toastify"
import { LoaderCircle, PanelRightClose } from "lucide-react"
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
                        toast.success('User data fetched successfully')
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
        <div className='flex w-full h-full min-h-dvh md:divide-x divide-gray-100'>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="py-4 px-4 max-h-[calc(100vh-40px)] overflow-y-auto">
                {/* Mobile Hamburger Button */}
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(true)}
                >
                    <PanelRightClose size={24} className="text-gray-500 stroke-[1.5]" />
                </button>
                <Outlet />
            </div>
        </div>
    )
}
